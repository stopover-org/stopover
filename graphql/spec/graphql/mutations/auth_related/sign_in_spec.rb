# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::AuthRelated::SignIn, type: :mutation do
  let(:default_time) { Time.current.at_beginning_of_hour }
  let(:mutation) do
    "
      mutation SignIn($input: SignInInput!) {
        signIn(input: $input) {
          user {
            id
            status
          }
          delay
          accessToken
          errors
          notification
        }
      }
    "
  end

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  before(:each) do
    $skip_phone_validation = false
  end

  teardown do
    $skip_phone_validation = true
  end

  shared_examples :notification_sent do |travel_to_delay|
    it 'notification sent' do
      travel_to(default_time + (travel_to_delay || 0.seconds)) do
        expect { subject }.to change { Notification.where(to: input[:username]).reload.count }.by(1)
      end
    end
  end

  context 'sign in (new user)' do
    let(:current_user) { nil }
    context 'by email' do
      let(:type) { 'email' }

      describe 'valid email' do
        let(:email) { 'user@stopover.com' }
        let(:input) { { username: email, type: type } }

        include_examples :notification_sent

        it 'successful' do
          result = nil

          travel_to(default_time) do
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(1)

            user = User.find_by(email: email)
            expect(user.status).to eq('inactive')
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(default_time)
            expect(user.confirmation_code).not_to be_nil

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('Confirmation code was sent')
          end
        end

        it 'delay and last try updating' do
          result = nil

          travel_to(default_time) do
            expect do
              result = GraphqlSchema.execute(mutation, variables: {
                                               input: input
                                             }, context: { current_user: current_user }).to_h.deep_symbolize_keys
            end.to change { User.count }.by(1)

            user = User.find_by(email: email)
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(Time.current)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('Confirmation code was sent')
          end

          travel_to(default_time + 30.seconds) do
            expect do
              result = GraphqlSchema.execute(mutation, variables: {
                                               input: input
                                             }, context: { current_user: current_user }).to_h.deep_symbolize_keys
            end.to change { User.count }.by(0)

            user = User.find_by(email: email)
            expect(user.delay).to eq(30)
            expect(user.last_try).to eq(30.seconds.ago)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(30)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to be_nil
          end

          travel_to(default_time + 90.seconds) do
            expect do
              result = GraphqlSchema.execute(mutation, variables: {
                                               input: input
                                             }, context: { current_user: current_user }).to_h.deep_symbolize_keys
            end.to change { User.count }.by(0)

            user = User.find_by(email: email)
            expect(user.delay).to eq(0)
            expect(user.last_try).to eq(90.seconds.ago)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(0)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end

      describe 'invalid email' do
        let(:email) { '+381 61 793 1517' }
        let(:input) { { username: email, type: type } }

        it 'failed' do
          result = nil

          travel_to(default_time) do
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to be_nil
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to eq(['Validation failed: Email is invalid'])
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end

      describe 'with valid confirmation code' do
        let(:email) { 'user@stopover.com' }
        let(:input) { { username: email, type: type, code: nil } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: email, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        it 'success' do
          result = nil

          travel_to(default_time) do
            user = User.last
            input[:code] = user.confirmation_code

            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)
                                                                .and change { Notification.count }.by(1)

            user = User.last
            expect(user.status).to eq('active')
            expect(user.confirmation_code).to be_nil
            expect(user.session_password).not_to be_nil
            expect(user.last_try).to be_nil
            expect(user.confirmed_at).to eq(Time.current)
            expect(user.account).not_to be_nil

            account = user.account
            expect(account.name).to eq(email)
            expect(account.phones).to be_empty

            expect(result.dig(:data, :signIn, :user, :id)).to eq(GraphqlSchema.id_from_object(user))
            expect(result.dig(:data, :signIn, :user, :status)).to eq('active')
            expect(result.dig(:data, :signIn, :delay)).to be_nil
            expect(result.dig(:data, :signIn, :accessToken)).to eq(user.access_token)
            expect(result.dig(:data, :signIn, :notification)).to eq('You successfully signed in')
            expect(result.dig(:data, :signIn, :errors)).to be_nil
          end
        end
      end

      describe 'with invalid confirmation code' do
        let(:email) { 'user@stopover.com' }
        let(:input) { { username: email, type: type, code: '<invalid-code>' } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: email, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        it 'failed' do
          result = nil

          travel_to(default_time) do
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.last
            expect(user.status).to eq('inactive')
            expect(user.confirmation_code).not_to be_nil
            expect(user.session_password).to be_nil
            expect(user.confirmed_at).to be_nil
            expect(user.account).to be_nil

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to be(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to eq(['Confirmation code is incorrect'])
          end
        end
      end

      describe 'reset code wo confirmation code' do
        let(:email) { 'user@stopover.com' }
        let(:input) { { username: email, type: type, resetCode: true } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: email, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        include_examples :notification_sent, 60.seconds

        it 'success' do
          result = nil

          travel_to(default_time + 60.seconds) do
            user = User.last
            expect(user.confirmation_code).not_to be_nil
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.last
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(Time.current)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('Confirmation code was sent')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end

        it 'failed (too often)' do
          result = nil

          travel_to(default_time) do
            user = User.last
            expect(user.confirmation_code).not_to be_nil
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.last
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(Time.current)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to eq(['You are trying to resend confirmation code too often'])
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end

      describe 'reset code w confirmation code' do
        let(:email) { 'user@stopover.com' }
        let(:input) { { username: email, type: type, resetCode: true } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: email, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        include_examples :notification_sent, 60.seconds

        it 'will authorize user' do
          result = nil

          travel_to(default_time + 60.seconds) do
            user = User.last
            expect(user.confirmation_code).not_to be_nil
            input[:code] = user.confirmation_code
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.last
            expect(user.delay).to eq(0)
            expect(user.last_try).to be_nil

            expect(result.dig(:data, :signIn, :user, :id)).to eq(GraphqlSchema.id_from_object(user))
            expect(result.dig(:data, :signIn, :user, :status)).to eq('active')
            expect(result.dig(:data, :signIn, :delay)).to be_nil
            expect(result.dig(:data, :signIn, :accessToken)).to eq(user.access_token)
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('You successfully signed in')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end
    end

    context 'by phone' do
      let(:type) { 'phone' }

      describe 'valid phone' do
        let(:phone) { '+7 (982 )932 02-83' }
        let(:input) { { username: phone, type: type } }

        it 'successful' do
          result = nil

          travel_to(default_time) do
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(1)

            user = User.find_by(phone: phone.gsub(/[\s()\-]/, ''))
            expect(user.status).to eq('inactive')
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(default_time)
            expect(user.confirmation_code).not_to be_nil

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('Confirmation code was sent')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end

        it 'delay and last try updating' do
          result = nil

          travel_to(default_time) do
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(1)

            user = User.find_by(phone: phone.gsub(/[\s()\-]/, ''))
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(Time.current)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('Confirmation code was sent')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end

          travel_to(default_time + 30.seconds) do
            expect do
              result = GraphqlSchema.execute(mutation, variables: {
                                               input: input
                                             }, context: { current_user: current_user }).to_h.deep_symbolize_keys
            end.to change { User.count }.by(0)

            user = User.find_by(phone: phone.gsub(/[\s()\-]/, ''))
            expect(user.delay).to eq(30)
            expect(user.last_try).to eq(30.seconds.ago)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(30)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end

          travel_to(default_time + 90.seconds) do
            expect do
              result = GraphqlSchema.execute(mutation, variables: {
                                               input: input
                                             }, context: { current_user: current_user }).to_h.deep_symbolize_keys
            end.to change { User.count }.by(0)

            user = User.find_by(phone: phone.gsub(/[\s()\-]/, ''))
            expect(user.delay).to eq(0)
            expect(user.last_try).to eq(90.seconds.ago)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(0)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end

      describe 'invalid phone like' do
        let(:phone) { '+381 61 793' }
        let(:input) { { username: phone, type: type } }

        it 'failed' do
          result = nil

          travel_to(default_time) do
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to be_nil
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to eq(['Validation failed: Phone is invalid'])
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end

      describe 'invalid phone' do
        let(:phone) { 'wrong phone' }
        let(:input) { { username: phone, type: type } }

        it 'failed' do
          result = nil

          travel_to(default_time) do
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to be_nil
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to eq(['Validation failed: Phone is invalid'])
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end

      describe 'with valid confirmation code' do
        let(:phone) { '+381 61 793 1517' }
        let(:input) { { username: phone, type: type, code: nil } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: phone, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        it 'success' do
          result = nil

          travel_to(default_time) do
            user = User.last
            input[:code] = user.confirmation_code
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.last
            expect(user.status).to eq('active')
            expect(user.confirmation_code).to be_nil
            expect(user.session_password).not_to be_nil
            expect(user.last_try).to be_nil
            expect(user.confirmed_at).to eq(Time.current)
            expect(user.account).not_to be_nil

            account = user.account
            expect(account.name).to eq('+381617931517')
            expect(account.phones).to eq(['+381617931517'])

            expect(result.dig(:data, :signIn, :user, :id)).to eq(GraphqlSchema.id_from_object(user))
            expect(result.dig(:data, :signIn, :user, :status)).to eq('active')
            expect(result.dig(:data, :signIn, :delay)).to be_nil
            expect(result.dig(:data, :signIn, :accessToken)).to eq(user.access_token)
            expect(result.dig(:data, :signIn, :notification)).to eq('You successfully signed in')
            expect(result.dig(:data, :signIn, :errors)).to be_nil
          end
        end
      end

      describe 'with invalid confirmation code' do
        let(:phone) { '+381 61 769 0531' }
        let(:input) { { username: phone, type: type, code: '<invalid-code>' } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: phone, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        it 'failed' do
          result = nil

          travel_to(default_time) do
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.last
            expect(user.status).to eq('inactive')
            expect(user.confirmation_code).not_to be_nil
            expect(user.session_password).to be_nil
            expect(user.confirmed_at).to be_nil
            expect(user.account).to be_nil

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to be(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to eq(['Confirmation code is incorrect'])
          end
        end
      end

      describe 'reset code wo confirmation code' do
        let(:phone) { '+381 61 195 7047' }
        let(:input) { { username: phone, type: type, resetCode: true } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: phone, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        it 'success' do
          result = nil

          travel_to(default_time + 60.seconds) do
            user = User.last
            expect(user.confirmation_code).not_to be_nil
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.last
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(Time.current)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('Confirmation code was sent')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end

        it 'failed (too often)' do
          result = nil

          travel_to(default_time) do
            user = User.last
            expect(user.confirmation_code).not_to be_nil
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.last
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(Time.current)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to eq(['You are trying to resend confirmation code too often'])
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end

      describe 'reset code w confirmation code' do
        let(:phone) { '+381 61 461 2572' }
        let(:input) { { username: phone, type: type, resetCode: true } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: phone, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        it 'will authorize user' do
          result = nil

          travel_to(default_time + 60.seconds) do
            user = User.last
            expect(user.confirmation_code).not_to be_nil
            input[:code] = user.confirmation_code

            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.last
            expect(user.delay).to eq(0)
            expect(user.last_try).to be_nil

            expect(result.dig(:data, :signIn, :user, :id)).to eq(GraphqlSchema.id_from_object(user))
            expect(result.dig(:data, :signIn, :user, :status)).to eq('active')
            expect(result.dig(:data, :signIn, :delay)).to be_nil
            expect(result.dig(:data, :signIn, :accessToken)).to eq(user.access_token)
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('You successfully signed in')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end
    end
  end

  context 'sign in (existing temporary user)' do
    let!(:current_user) { create(:temporary_user) }
    context 'by email' do
      let(:type) { 'email' }

      describe 'valid email' do
        let(:email) { 'user@stopover.com' }
        let(:input) { { username: email, type: type } }

        include_examples :notification_sent

        it 'successful' do
          result = nil

          travel_to(default_time) do
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.find_by(email: email)
            expect(user.status).to eq('inactive')
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(default_time)
            expect(user.confirmation_code).not_to be_nil

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('Confirmation code was sent')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end

        it 'delay and last try updating' do
          result = nil

          travel_to(default_time) do
            expect do
              result = GraphqlSchema.execute(mutation, variables: {
                                               input: input
                                             }, context: { current_user: current_user }).to_h.deep_symbolize_keys
            end.to change { User.count }.by(0)

            user = User.find_by(email: email)
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(Time.current)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('Confirmation code was sent')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end

          travel_to(default_time + 30.seconds) do
            expect do
              result = GraphqlSchema.execute(mutation, variables: {
                                               input: input
                                             }, context: { current_user: current_user }).to_h.deep_symbolize_keys
            end.to change { User.count }.by(0)

            user = User.find_by(email: email)
            expect(user.delay).to eq(30)
            expect(user.last_try).to eq(30.seconds.ago)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(30)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end

          travel_to(default_time + 90.seconds) do
            expect do
              result = GraphqlSchema.execute(mutation, variables: {
                                               input: input
                                             }, context: { current_user: current_user }).to_h.deep_symbolize_keys
            end.to change { User.count }.by(0)

            user = User.find_by(email: email)
            expect(user.delay).to eq(0)
            expect(user.last_try).to eq(90.seconds.ago)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(0)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end

      describe 'invalid email' do
        let(:email) { '+381 61 793 1517' }
        let(:input) { { username: email, type: type } }

        it 'failed' do
          result = nil

          travel_to(default_time) do
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to be_nil
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to eq(['Validation failed: Email is invalid'])
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end

      describe 'with valid confirmation code' do
        let(:email) { 'user@stopover.com' }
        let(:input) { { username: email, type: type, code: nil } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: email, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        it 'success' do
          result = nil

          travel_to(default_time) do
            user = User.last
            input[:code] = user.confirmation_code
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)
                                                                .and change { Notification.count }.by(1)

            user = User.last
            expect(user.status).to eq('active')
            expect(user.confirmation_code).to be_nil
            expect(user.session_password).not_to be_nil
            expect(user.last_try).to be_nil
            expect(user.confirmed_at).to eq(Time.current)
            expect(user.account).not_to be_nil

            account = user.account
            expect(account.name).to eq(email)
            expect(account.phones).to be_empty

            expect(result.dig(:data, :signIn, :user, :id)).to eq(GraphqlSchema.id_from_object(user))
            expect(result.dig(:data, :signIn, :user, :status)).to eq('active')
            expect(result.dig(:data, :signIn, :delay)).to be_nil
            expect(result.dig(:data, :signIn, :accessToken)).to eq(user.access_token)
            expect(result.dig(:data, :signIn, :notification)).to eq('You successfully signed in')
            expect(result.dig(:data, :signIn, :errors)).to be_nil
          end
        end
      end

      describe 'with invalid confirmation code' do
        let(:email) { 'user@stopover.com' }
        let(:input) { { username: email, type: type, code: '<invalid-code>' } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: email, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        it 'failed' do
          result = nil

          travel_to(default_time) do
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.last
            expect(user.status).to eq('inactive')
            expect(user.confirmation_code).not_to be_nil
            expect(user.session_password).to be_nil
            expect(user.confirmed_at).to be_nil
            expect(user.account).to be_nil

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to be(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to eq(['Confirmation code is incorrect'])
          end
        end
      end

      describe 'reset code wo confirmation code' do
        let(:email) { 'user@stopover.com' }
        let(:input) { { username: email, type: type, resetCode: true } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: email, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        include_examples :notification_sent, 60.seconds

        it 'success' do
          result = nil

          travel_to(default_time + 60.seconds) do
            user = User.last
            expect(user.confirmation_code).not_to be_nil
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.last
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(Time.current)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('Confirmation code was sent')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end

        it 'failed (too often)' do
          result = nil

          travel_to(default_time) do
            user = User.last
            expect(user.confirmation_code).not_to be_nil
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.last
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(Time.current)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to eq(['You are trying to resend confirmation code too often'])
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end

      describe 'reset code w confirmation code' do
        let(:email) { 'user@stopover.com' }
        let(:input) { { username: email, type: type, resetCode: true } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: email, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        include_examples :notification_sent, 60.seconds

        it 'will authorize user' do
          result = nil

          travel_to(default_time + 60.seconds) do
            user = User.last
            expect(user.confirmation_code).not_to be_nil
            input[:code] = user.confirmation_code
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.last
            expect(user.delay).to eq(0)
            expect(user.last_try).to be_nil

            expect(result.dig(:data, :signIn, :user, :id)).to eq(GraphqlSchema.id_from_object(user))
            expect(result.dig(:data, :signIn, :user, :status)).to eq('active')
            expect(result.dig(:data, :signIn, :delay)).to be_nil
            expect(result.dig(:data, :signIn, :accessToken)).to eq(user.access_token)
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('You successfully signed in')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end
    end

    context 'by phone' do
      let(:type) { 'phone' }

      describe 'valid phone' do
        let(:phone) { '+7 (982 )932 02-83' }
        let(:input) { { username: phone, type: type } }

        it 'successful' do
          result = nil

          travel_to(default_time) do
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.find_by(phone: phone.gsub(/[\s()\-]/, ''))
            expect(user.status).to eq('inactive')
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(default_time)
            expect(user.confirmation_code).not_to be_nil

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('Confirmation code was sent')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end

        it 'delay and last try updating' do
          result = nil

          travel_to(default_time) do
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.find_by(phone: phone.gsub(/[\s()\-]/, ''))
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(Time.current)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('Confirmation code was sent')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end

          travel_to(default_time + 30.seconds) do
            expect do
              result = GraphqlSchema.execute(mutation, variables: {
                                               input: input
                                             }, context: { current_user: current_user }).to_h.deep_symbolize_keys
            end.to change { User.count }.by(0)

            user = User.find_by(phone: phone.gsub(/[\s()\-]/, ''))
            expect(user.delay).to eq(30)
            expect(user.last_try).to eq(30.seconds.ago)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(30)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end

          travel_to(default_time + 90.seconds) do
            expect do
              result = GraphqlSchema.execute(mutation, variables: {
                                               input: input
                                             }, context: { current_user: current_user }).to_h.deep_symbolize_keys
            end.to change { User.count }.by(0)

            user = User.find_by(phone: phone.gsub(/[\s()\-]/, ''))
            expect(user.delay).to eq(0)
            expect(user.last_try).to eq(90.seconds.ago)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(0)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end

      describe 'invalid phone like' do
        let(:phone) { '+381 61 793' }
        let(:input) { { username: phone, type: type } }

        it 'failed' do
          result = nil

          travel_to(default_time) do
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to be_nil
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to eq(['Validation failed: Phone is invalid'])
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end

      describe 'invalid phone' do
        let(:phone) { 'wrong phone' }
        let(:input) { { username: phone, type: type } }

        it 'failed' do
          result = nil

          travel_to(default_time) do
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to be_nil
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to eq(['Validation failed: Phone is invalid'])
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end

      describe 'with valid confirmation code' do
        let(:phone) { '+381 61 793 1517' }
        let(:input) { { username: phone, type: type, code: nil } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: phone, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        it 'success' do
          result = nil

          travel_to(default_time) do
            user = User.last
            input[:code] = user.confirmation_code
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.last
            expect(user.status).to eq('active')
            expect(user.confirmation_code).to be_nil
            expect(user.session_password).not_to be_nil
            expect(user.last_try).to be_nil
            expect(user.confirmed_at).to eq(Time.current)
            expect(user.account).not_to be_nil

            account = user.account
            expect(account.name).to eq('+381617931517')
            expect(account.phones).to eq(['+381617931517'])

            expect(result.dig(:data, :signIn, :user, :id)).to eq(GraphqlSchema.id_from_object(user))
            expect(result.dig(:data, :signIn, :user, :status)).to eq('active')
            expect(result.dig(:data, :signIn, :delay)).to be_nil
            expect(result.dig(:data, :signIn, :accessToken)).to eq(user.access_token)
            expect(result.dig(:data, :signIn, :notification)).to eq('You successfully signed in')
            expect(result.dig(:data, :signIn, :errors)).to be_nil
          end
        end
      end

      describe 'with invalid confirmation code' do
        let(:phone) { '+381 61 769 0531' }
        let(:input) { { username: phone, type: type, code: '<invalid-code>' } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: phone, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        it 'failed' do
          result = nil

          travel_to(default_time) do
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.last
            expect(user.status).to eq('inactive')
            expect(user.confirmation_code).not_to be_nil
            expect(user.session_password).to be_nil
            expect(user.confirmed_at).to be_nil
            expect(user.account).to be_nil

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to be(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to eq(['Confirmation code is incorrect'])
          end
        end
      end

      describe 'reset code wo confirmation code' do
        let(:phone) { '+381 61 195 7047' }
        let(:input) { { username: phone, type: type, resetCode: true } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: phone, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        it 'success' do
          result = nil

          travel_to(default_time + 60.seconds) do
            user = User.last
            expect(user.confirmation_code).not_to be_nil
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.last
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(Time.current)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('Confirmation code was sent')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end

        it 'failed (too often)' do
          result = nil

          travel_to(default_time) do
            user = User.last
            expect(user.confirmation_code).not_to be_nil
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.last
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(Time.current)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to eq(['You are trying to resend confirmation code too often'])
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end

      describe 'reset code w confirmation code' do
        let(:phone) { '+381 61 461 2572' }
        let(:input) { { username: phone, type: type, resetCode: true } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: phone, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        it 'will authorize user' do
          result = nil

          travel_to(default_time + 60.seconds) do
            user = User.last
            expect(user.confirmation_code).not_to be_nil
            input[:code] = user.confirmation_code
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.last
            expect(user.delay).to eq(0)
            expect(user.last_try).to be_nil

            expect(result.dig(:data, :signIn, :user, :id)).to eq(GraphqlSchema.id_from_object(user))
            expect(result.dig(:data, :signIn, :user, :status)).to eq('active')
            expect(result.dig(:data, :signIn, :delay)).to be_nil
            expect(result.dig(:data, :signIn, :accessToken)).to eq(user.access_token)
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('You successfully signed in')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end
    end
  end

  context 'sign in (existing active user)' do
    let(:email) { 'email@stopover.com' }
    let(:phone) { '+381 61 793 1517'.gsub(/[\s()\-]/, '') }
    let!(:current_user) { create(:active_user, email: email, phone: phone, with_account: true) }
    context 'by email' do
      let(:type) { 'email' }

      describe 'valid email' do
        let(:input) { { username: email, type: type } }

        include_examples :notification_sent

        it 'successful' do
          result = nil
          expect(current_user.account).not_to be_nil

          travel_to(default_time) do
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = current_user.reload
            expect(user.status).to eq('active')
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(Time.current)
            expect(user.confirmation_code).not_to be_nil

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('Confirmation code was sent')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end

        it 'delay and last try updating' do
          result = nil
          expect(current_user.account).not_to be_nil

          travel_to(default_time) do
            expect do
              result = GraphqlSchema.execute(mutation, variables: {
                                               input: input
                                             }, context: { current_user: current_user }).to_h.deep_symbolize_keys
            end.to change { User.count }.by(0)

            user = current_user.reload
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(Time.current)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('Confirmation code was sent')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end

          travel_to(default_time + 30.seconds) do
            expect do
              result = GraphqlSchema.execute(mutation, variables: {
                                               input: input
                                             }, context: { current_user: current_user }).to_h.deep_symbolize_keys
            end.to change { User.count }.by(0)

            user = current_user.reload
            expect(user.delay).to eq(30)
            expect(user.last_try).to eq(30.seconds.ago)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(30)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end

          travel_to(default_time + 90.seconds) do
            expect do
              result = GraphqlSchema.execute(mutation, variables: {
                                               input: input
                                             }, context: { current_user: current_user }).to_h.deep_symbolize_keys
            end.to change { User.count }.by(0)

            user = current_user.reload
            expect(user.delay).to eq(0)
            expect(user.last_try).to eq(90.seconds.ago)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(0)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end

      describe 'with valid confirmation code' do
        let(:input) { { username: email, type: type, code: nil } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: email, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        it 'success' do
          result = nil

          travel_to(default_time) do
            user = User.last
            input[:code] = user.confirmation_code
            expect(user.account).not_to be_nil
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)
                                                                .and change { Notification.count }.by(1)

            user = current_user.reload
            expect(user.status).to eq('active')
            expect(user.confirmation_code).to be_nil
            expect(user.session_password).not_to be_nil
            expect(user.last_try).to be_nil
            expect(user.confirmed_at).to eq(Time.current)
            expect(user.account).not_to be_nil

            expect(result.dig(:data, :signIn, :user, :id)).to eq(GraphqlSchema.id_from_object(user))
            expect(result.dig(:data, :signIn, :user, :status)).to eq('active')
            expect(result.dig(:data, :signIn, :delay)).to be_nil
            expect(result.dig(:data, :signIn, :accessToken)).to eq(user.access_token)
            expect(result.dig(:data, :signIn, :notification)).to eq('You successfully signed in')
            expect(result.dig(:data, :signIn, :errors)).to be_nil
          end
        end
      end

      describe 'with invalid confirmation code' do
        let(:input) { { username: email, type: type, code: '<invalid-code>' } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: email, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        it 'failed' do
          result = nil

          travel_to(default_time) do
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = current_user.reload
            expect(user.status).to eq('active')
            expect(user.confirmation_code).not_to be_nil

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to be(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to eq(['Confirmation code is incorrect'])
          end
        end
      end

      describe 'reset code wo confirmation code' do
        let(:input) { { username: email, type: type, resetCode: true } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: email, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        include_examples :notification_sent, 60.seconds

        it 'success' do
          result = nil
          expect(current_user.account).not_to be_nil

          travel_to(default_time + 60.seconds) do
            user = User.last
            expect(user.confirmation_code).not_to be_nil
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = current_user.reload
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(Time.current)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('Confirmation code was sent')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end

        it 'failed (too often)' do
          result = nil
          expect(current_user.account).not_to be_nil

          travel_to(default_time) do
            user = User.last
            expect(user.confirmation_code).not_to be_nil
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = current_user.reload
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(Time.current)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to eq(['You are trying to resend confirmation code too often'])
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end

      describe 'reset code w confirmation code' do
        let(:input) { { username: email, type: type, resetCode: true } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: email, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        include_examples :notification_sent, 60.seconds

        it 'will authorize user' do
          result = nil
          expect(current_user.account).not_to be_nil

          travel_to(default_time + 60.seconds) do
            user = User.last
            expect(user.confirmation_code).not_to be_nil
            input[:code] = user.confirmation_code
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = current_user.reload
            expect(user.delay).to eq(0)
            expect(user.last_try).to be_nil

            expect(result.dig(:data, :signIn, :user, :id)).to eq(GraphqlSchema.id_from_object(user))
            expect(result.dig(:data, :signIn, :user, :status)).to eq('active')
            expect(result.dig(:data, :signIn, :delay)).to be_nil
            expect(result.dig(:data, :signIn, :accessToken)).to eq(user.access_token)
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('You successfully signed in')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end
    end

    context 'by phone' do
      let(:type) { 'phone' }

      describe 'valid phone' do
        let(:input) { { username: phone, type: type } }

        it 'successful' do
          result = nil
          expect(current_user.account).not_to be_nil

          travel_to(default_time) do
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = current_user.reload
            expect(user.status).to eq('active')
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(default_time)
            expect(user.confirmation_code).not_to be_nil

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('Confirmation code was sent')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end

        it 'delay and last try updating' do
          result = nil

          travel_to(default_time) do
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = current_user.reload
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(Time.current)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('Confirmation code was sent')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end

          travel_to(default_time + 30.seconds) do
            expect do
              result = GraphqlSchema.execute(mutation, variables: {
                                               input: input
                                             }, context: { current_user: current_user }).to_h.deep_symbolize_keys
            end.to change { User.count }.by(0)

            user = User.find_by(phone: phone.gsub(/[\s()\-]/, ''))
            expect(user.delay).to eq(30)
            expect(user.last_try).to eq(30.seconds.ago)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(30)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end

          travel_to(default_time + 90.seconds) do
            expect do
              result = GraphqlSchema.execute(mutation, variables: {
                                               input: input
                                             }, context: { current_user: current_user }).to_h.deep_symbolize_keys
            end.to change { User.count }.by(0)

            user = User.find_by(phone: phone.gsub(/[\s()\-]/, ''))
            expect(user.delay).to eq(0)
            expect(user.last_try).to eq(90.seconds.ago)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(0)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end

      describe 'with valid confirmation code' do
        let(:input) { { username: phone, type: type, code: nil } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: phone, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        it 'success' do
          result = nil
          expect(current_user.account).not_to be_nil

          travel_to(default_time) do
            user = User.last
            input[:code] = user.confirmation_code
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = current_user.reload
            expect(user.status).to eq('active')
            expect(user.confirmation_code).to be_nil
            expect(user.session_password).not_to be_nil
            expect(user.last_try).to eq(nil)
            expect(user.confirmed_at).to eq(Time.current)
            expect(user.account).not_to be_nil

            account = user.account

            expect(result.dig(:data, :signIn, :user, :id)).to eq(GraphqlSchema.id_from_object(user))
            expect(result.dig(:data, :signIn, :user, :status)).to eq('active')
            expect(result.dig(:data, :signIn, :delay)).to be_nil
            expect(result.dig(:data, :signIn, :accessToken)).to eq(user.access_token)
            expect(result.dig(:data, :signIn, :notification)).to eq('You successfully signed in')
            expect(result.dig(:data, :signIn, :errors)).to be_nil
          end
        end
      end

      describe 'with invalid confirmation code' do
        let(:input) { { username: phone, type: type, code: '<invalid-code>' } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: phone, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        it 'failed' do
          result = nil
          expect(current_user.account).not_to be_nil

          travel_to(default_time) do
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = current_user.reload
            expect(user.status).to eq('active')

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to be(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to eq(['Confirmation code is incorrect'])
          end
        end
      end

      describe 'reset code wo confirmation code' do
        let(:input) { { username: phone, type: type, resetCode: true } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: phone, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        it 'success' do
          result = nil
          expect(current_user.account).not_to be_nil

          travel_to(default_time + 60.seconds) do
            user = current_user.reload
            expect(user.confirmation_code).not_to be_nil
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user.reload

            expect(user.delay).to eq(60)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('Confirmation code was sent')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end

        it 'failed (too often)' do
          result = nil
          expect(current_user.account).not_to be_nil

          travel_to(default_time) do
            user = current_user.reload
            expect(user.confirmation_code).not_to be_nil
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user.reload

            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(Time.current)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to eq(['You are trying to resend confirmation code too often'])
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end

      describe 'reset code w confirmation code' do
        let(:input) { { username: phone, type: type, resetCode: true } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: phone, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        it 'will authorize user' do
          result = nil
          expect(current_user.account).not_to be_nil

          travel_to(default_time + 60.seconds) do
            user = current_user.reload
            expect(user.confirmation_code).not_to be_nil
            input[:code] = user.confirmation_code
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user.reload

            expect(user.delay).to eq(0)
            expect(user.last_try).to be_nil

            expect(result.dig(:data, :signIn, :user, :id)).to eq(GraphqlSchema.id_from_object(user))
            expect(result.dig(:data, :signIn, :user, :status)).to eq('active')
            expect(result.dig(:data, :signIn, :delay)).to be_nil
            expect(result.dig(:data, :signIn, :accessToken)).to eq(user.access_token)
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('You successfully signed in')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end
    end
  end

  context 'sign in (existing inactive user)' do
    let(:email) { 'email@stopover.com' }
    let(:phone) { '+381 61 793 1517'.gsub(/[\s()\-]/, '') }
    let!(:current_user) { create(:inactive_user, email: email, phone: phone) }
    context 'by email' do
      let(:type) { 'email' }

      describe 'valid email' do
        let(:input) { { username: email, type: type } }

        include_examples :notification_sent

        it 'successful' do
          result = nil

          travel_to(default_time) do
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.find_by(email: email)
            expect(user.status).to eq('inactive')
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(default_time)
            expect(user.confirmation_code).not_to be_nil

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('Confirmation code was sent')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end

        it 'delay and last try updating' do
          result = nil

          travel_to(default_time) do
            expect do
              result = GraphqlSchema.execute(mutation, variables: {
                                               input: input
                                             }, context: { current_user: current_user }).to_h.deep_symbolize_keys
            end.to change { User.count }.by(0)

            user = User.find_by(email: email)
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(Time.current)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('Confirmation code was sent')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end

          travel_to(default_time + 30.seconds) do
            expect do
              result = GraphqlSchema.execute(mutation, variables: {
                                               input: input
                                             }, context: { current_user: current_user }).to_h.deep_symbolize_keys
            end.to change { User.count }.by(0)

            user = User.find_by(email: email)
            expect(user.delay).to eq(30)
            expect(user.last_try).to eq(30.seconds.ago)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(30)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end

          travel_to(default_time + 90.seconds) do
            expect do
              result = GraphqlSchema.execute(mutation, variables: {
                                               input: input
                                             }, context: { current_user: current_user }).to_h.deep_symbolize_keys
            end.to change { User.count }.by(0)

            user = User.find_by(email: email)
            expect(user.delay).to eq(0)
            expect(user.last_try).to eq(90.seconds.ago)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(0)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end

      describe 'with valid confirmation code' do
        let(:input) { { username: email, type: type, code: nil } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: email, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        it 'success' do
          result = nil

          travel_to(default_time) do
            user = User.last
            input[:code] = user.confirmation_code
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)
                                                                .and change { Notification.count }.by(1)

            user.reload

            expect(user.status).to eq('active')
            expect(user.confirmation_code).to be_nil
            expect(user.session_password).not_to be_nil
            expect(user.last_try).to be_nil
            expect(user.confirmed_at).to eq(Time.current)
            expect(user.account).not_to be_nil

            expect(result.dig(:data, :signIn, :user, :id)).to eq(GraphqlSchema.id_from_object(user))
            expect(result.dig(:data, :signIn, :user, :status)).to eq('active')
            expect(result.dig(:data, :signIn, :delay)).to be_nil
            expect(result.dig(:data, :signIn, :accessToken)).to eq(user.access_token)
            expect(result.dig(:data, :signIn, :notification)).to eq('You successfully signed in')
            expect(result.dig(:data, :signIn, :errors)).to be_nil
          end
        end
      end

      describe 'with invalid confirmation code' do
        let(:input) { { username: email, type: type, code: '<invalid-code>' } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: email, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        it 'failed' do
          result = nil

          travel_to(default_time) do
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.last
            expect(user.status).to eq('inactive')
            expect(user.confirmation_code).not_to be_nil
            expect(user.session_password).to be_nil
            expect(user.confirmed_at).to be_nil
            expect(user.account).to be_nil

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to be(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to eq(['Confirmation code is incorrect'])
          end
        end
      end

      describe 'reset code wo confirmation code' do
        let(:input) { { username: email, type: type, resetCode: true } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: email, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        include_examples :notification_sent, 60.seconds

        it 'success' do
          result = nil

          travel_to(default_time + 60.seconds) do
            user = User.last
            expect(user.confirmation_code).not_to be_nil
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.last
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(Time.current)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('Confirmation code was sent')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end

        it 'failed (too often)' do
          result = nil

          travel_to(default_time) do
            user = User.last
            expect(user.confirmation_code).not_to be_nil
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.last
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(Time.current)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to eq(['You are trying to resend confirmation code too often'])
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end

      describe 'reset code w confirmation code' do
        let(:input) { { username: email, type: type, resetCode: true } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: email, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        include_examples :notification_sent, 60.seconds

        it 'will authorize user' do
          result = nil

          travel_to(default_time + 60.seconds) do
            user = User.last
            expect(user.confirmation_code).not_to be_nil
            input[:code] = user.confirmation_code
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.last
            expect(user.delay).to eq(0)
            expect(user.last_try).to be_nil

            expect(result.dig(:data, :signIn, :user, :id)).to eq(GraphqlSchema.id_from_object(user))
            expect(result.dig(:data, :signIn, :user, :status)).to eq('active')
            expect(result.dig(:data, :signIn, :delay)).to be_nil
            expect(result.dig(:data, :signIn, :accessToken)).to eq(user.access_token)
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('You successfully signed in')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end
    end

    context 'by phone' do
      let(:type) { 'phone' }

      describe 'valid phone' do
        let(:input) { { username: phone, type: type } }

        it 'successful' do
          result = nil

          travel_to(default_time) do
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.find_by(phone: phone.gsub(/[\s()\-]/, ''))
            expect(user.status).to eq('inactive')
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(default_time)
            expect(user.confirmation_code).not_to be_nil

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('Confirmation code was sent')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end

        it 'delay and last try updating' do
          result = nil

          travel_to(default_time) do
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.find_by(phone: phone.gsub(/[\s()\-]/, ''))
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(Time.current)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('Confirmation code was sent')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end

          travel_to(default_time + 30.seconds) do
            expect do
              result = GraphqlSchema.execute(mutation, variables: {
                                               input: input
                                             }, context: { current_user: current_user }).to_h.deep_symbolize_keys
            end.to change { User.count }.by(0)

            user = User.find_by(phone: phone.gsub(/[\s()\-]/, ''))
            expect(user.delay).to eq(30)
            expect(user.last_try).to eq(30.seconds.ago)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(30)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end

          travel_to(default_time + 90.seconds) do
            expect do
              result = GraphqlSchema.execute(mutation, variables: {
                                               input: input
                                             }, context: { current_user: current_user }).to_h.deep_symbolize_keys
            end.to change { User.count }.by(0)

            user = User.find_by(phone: phone.gsub(/[\s()\-]/, ''))
            expect(user.delay).to eq(0)
            expect(user.last_try).to eq(90.seconds.ago)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(0)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end

      describe 'with valid confirmation code' do
        let(:input) { { username: phone, type: type, code: nil } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: phone, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        it 'success' do
          result = nil

          travel_to(default_time) do
            user = User.last
            input[:code] = user.confirmation_code
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.last
            expect(user.status).to eq('active')
            expect(user.confirmation_code).to be_nil
            expect(user.session_password).not_to be_nil
            expect(user.last_try).to be_nil
            expect(user.confirmed_at).to eq(Time.current)
            expect(user.account).not_to be_nil

            account = user.account
            expect(account.name).to eq('+381617931517')
            expect(account.phones).to eq(['+381617931517'])

            expect(result.dig(:data, :signIn, :user, :id)).to eq(GraphqlSchema.id_from_object(user))
            expect(result.dig(:data, :signIn, :user, :status)).to eq('active')
            expect(result.dig(:data, :signIn, :delay)).to be_nil
            expect(result.dig(:data, :signIn, :accessToken)).to eq(user.access_token)
            expect(result.dig(:data, :signIn, :notification)).to eq('You successfully signed in')
            expect(result.dig(:data, :signIn, :errors)).to be_nil
          end
        end
      end

      describe 'with invalid confirmation code' do
        let(:input) { { username: phone, type: type, code: '<invalid-code>' } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: phone, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        it 'failed' do
          result = nil

          travel_to(default_time) do
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.last
            expect(user.status).to eq('inactive')
            expect(user.confirmation_code).not_to be_nil
            expect(user.session_password).to be_nil
            expect(user.confirmed_at).to be_nil
            expect(user.account).to be_nil

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to be(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to eq(['Confirmation code is incorrect'])
          end
        end
      end

      describe 'reset code wo confirmation code' do
        let(:input) { { username: phone, type: type, resetCode: true } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: phone, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        it 'success' do
          result = nil

          travel_to(default_time + 60.seconds) do
            user = User.last
            expect(user.confirmation_code).not_to be_nil
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.last
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(Time.current)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('Confirmation code was sent')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end

        it 'failed (too often)' do
          result = nil

          travel_to(default_time) do
            user = User.last
            expect(user.confirmation_code).not_to be_nil
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.last
            expect(user.delay).to eq(60)
            expect(user.last_try).to eq(Time.current)

            expect(result.dig(:data, :signIn, :user)).to be_nil
            expect(result.dig(:data, :signIn, :delay)).to eq(60)
            expect(result.dig(:data, :signIn, :accessToken)).to be_nil
            expect(result.dig(:data, :signIn, :errors)).to eq(['You are trying to resend confirmation code too often'])
            expect(result.dig(:data, :signIn, :notification)).to be_nil
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end

      describe 'reset code w confirmation code' do
        let(:input) { { username: phone, type: type, resetCode: true } }

        before do
          travel_to(default_time) do
            GraphqlSchema.execute(mutation,
                                  variables: {
                                    input: { username: phone, type: type }
                                  },
                                    context: { current_user: current_user })
          end
        end

        it 'will authorize user' do
          result = nil

          travel_to(default_time + 60.seconds) do
            user = User.last
            expect(user.confirmation_code).not_to be_nil
            input[:code] = user.confirmation_code
            expect { result = subject.to_h.deep_symbolize_keys }.to change { User.count }.by(0)

            user = User.last
            expect(user.delay).to eq(0)
            expect(user.last_try).to be_nil

            expect(result.dig(:data, :signIn, :user, :id)).to eq(GraphqlSchema.id_from_object(user))
            expect(result.dig(:data, :signIn, :user, :status)).to eq('active')
            expect(result.dig(:data, :signIn, :delay)).to be_nil
            expect(result.dig(:data, :signIn, :accessToken)).to eq(user.access_token)
            expect(result.dig(:data, :signIn, :errors)).to be_nil
            expect(result.dig(:data, :signIn, :notification)).to eq('You successfully signed in')
            expect(result.dig(:data, :signIn, :redirectUrl)).to be_nil
          end
        end
      end
    end
  end
end
