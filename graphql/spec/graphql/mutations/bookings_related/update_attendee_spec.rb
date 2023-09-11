# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::BookingsRelated::UpdateAttendee, type: :mutation do
  let(:mutation) do
    "
      mutation UpdateAttendee($input: UpdateAttendeeInput!) {
        updateAttendee(input: $input) {
          attendee {
            id
            status
            firstName
            lastName
            email
            phone
            eventOptions {
              id
              forAttendee
            }
          }

          errors
          notification
        }
      }
    "
  end
  let!(:attendee) { create(:attendee) }
  let(:current_user) { attendee.booking.firm.accounts.last.user }
  let(:event_options) { create_list(:event_option, 4, for_attendee: true, event: attendee.booking.event) }

  let(:input) do
    { attendeeId: GraphqlSchema.id_from_object(attendee),
      firstName: 'Name',
      lastName: 'Surname',
      email: 'some@mail.com',
      phone: '+8 88888 88 88' }
  end

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  shared_examples :successful do |with_options, status|
    it 'successful' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Attendee.count }.by(0)

      expect(result.dig(:data, :updateAttendee, :attendee, :id)).to eq(GraphqlSchema.id_from_object(attendee))
      expect(result.dig(:data, :updateAttendee, :attendee, :status)).to eq(status)
      expect(result.dig(:data, :updateAttendee, :attendee, :firstName)).to eq('Name')
      expect(result.dig(:data, :updateAttendee, :attendee, :lastName)).to eq('Surname')
      expect(result.dig(:data, :updateAttendee, :attendee, :email)).to eq('some@mail.com')
      expect(result.dig(:data, :updateAttendee, :attendee, :phone)).to eq('+8 88888 88 88')
      if with_options
        result.dig(:data, :updateAttendee, :attendee, :eventOptions).each_with_index do |opt, idx|
          expect(opt[:id]).to eq(GraphqlSchema.id_from_object(event_options[idx]))
          expect(opt[:forAttendee]).to eq(true)
        end
      end
      expect(result.dig(:data, :updateAttendee, :notification)).to eq('Attendee was updated!')
    end
  end

  shared_examples :fail do |error|
    it 'fails' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Attendee.count }.by(0)

      expect(result.dig(:data, :updateAttendee, :attendee)).to be_nil
      expect(result.dig(:data, :updateAttendee, :errors)).to include(error)
    end
  end

  context 'update attendee' do
    context 'as manager' do
      let(:current_user) { attendee.booking.user }

      context 'with event options' do
        before { input[:eventOptionIds] = event_options.map { |opt| GraphqlSchema.id_from_object(opt) } }

        context 'for registered attendee' do
          before { attendee.update(status: 'registered') }
          include_examples :successful, true, 'registered'
        end

        context 'for not registered attendee' do
          include_examples :successful, true, 'not_registered'
        end
      end

      context 'without event_options' do
        context 'for registered attendee' do
          before { attendee.update(status: 'registered') }
          include_examples :successful, false, 'registered'
        end

        context 'for not registered attendee' do
          include_examples :successful, false, 'not_registered'
        end
      end
    end

    context 'as common user' do
      let(:current_user) { attendee.booking.user }

      context 'with event options' do
        before { input[:eventOptionIds] = event_options.map { |opt| GraphqlSchema.id_from_object(opt) } }

        context 'for registered attendee' do
          let(:current_user) { attendee.booking.user }
          before { attendee.update(status: 'registered') }
          include_examples :successful, true, 'registered'
        end

        context 'for not registered attendee' do
          include_examples :successful, true, 'not_registered'
        end
      end

      context 'without event_options' do
        context 'for registered attendee' do
          before { attendee.update(status: 'registered') }
          include_examples :successful, false, 'registered'
        end

        context 'for not registered attendee' do
          include_examples :successful, false, 'not_registered'
        end
      end
    end

    context 'permissions' do
      context 'for removed attendee' do
        before { attendee.update(status: 'removed') }
        include_examples :fail, 'Attendee was removed'
      end

      context 'with event options for bookings' do
        before { input[:eventOptionIds] = create_list(:event_option, 4, event: attendee.event, for_attendee: false).map { |opt| GraphqlSchema.id_from_object(opt) } }
        include_examples :fail, 'Wrong option type'
      end

      context 'for past booking' do
        before { attendee.booking.schedule.update(scheduled_for: 5.days.ago) }
        include_examples :fail, 'Event past'
      end

      context 'for cancelled booking' do
        before { attendee.booking.update(status: 'cancelled') }
        include_examples :fail, 'Booking cancelled'
      end

      context 'as manager of another company' do
        let!(:current_user) { create(:firm).accounts.last.user }
        include_examples :fail, 'You are not authorized'
      end
    end
  end
end
