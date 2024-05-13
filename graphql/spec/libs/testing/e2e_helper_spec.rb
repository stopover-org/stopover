# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Stopover::Testing::E2eHelper, type: :helper do
  describe '.user_data' do
    context 'with a valid user' do
      let(:user) { create(:active_user) }
      subject { JSON.parse(Stopover::Testing::E2eHelper.user_data(user)) }
      it 'returns the correct keys' do
        result = subject
        expect(result.keys).to include(*%w[access_token graphql_id])
      end

      it 'returns the correct access_token' do
        result = subject
        expect(result['access_token']).to eq user.access_token
      end

      it 'returns the correct graphql_id' do
        result = subject
        graphql_id = GraphqlSchema.id_from_object(user) # assuming GraphqlSchema class has method id_from_object
        expect(result['graphql_id']).to eq graphql_id
      end
    end
  end

  describe '.account_data' do
    context 'with a valid account_data' do
      let(:account) { create(:account) }
      subject { JSON.parse(Stopover::Testing::E2eHelper.account_data(account)) }
      it 'returns the correct keys' do
        result = subject
        expect(result.keys).to include(*%w[user graphql_id])
      end

      it 'returns the correct user' do
        result = subject
        expect(result['user']).to eq Stopover::Testing::E2eHelper.user_data(account.user)
      end

      it 'returns the correct graphql_id' do
        result = subject
        graphql_id = GraphqlSchema.id_from_object(account) # assuming GraphqlSchema class has method id_from_object
        expect(result['graphql_id']).to eq graphql_id
      end
    end
  end

  describe '.account_data' do
    context 'with a valid account_data' do
      let(:firm) { create(:firm) }
      subject { JSON.parse(Stopover::Testing::E2eHelper.firm_data(firm)) }
      it 'returns the correct keys' do
        result = subject
        expect(result.keys).to include(*%w[accounts graphql_id])
      end

      it 'returns the correct user' do
        result = subject
        expect(result['accounts']).to eq(firm.accounts.map { |account| Stopover::Testing::E2eHelper.account_data(account) })
      end

      it 'returns the correct graphql_id' do
        result = subject
        graphql_id = GraphqlSchema.id_from_object(firm) # assuming GraphqlSchema class has method id_from_object
        expect(result['graphql_id']).to eq graphql_id
      end
    end
  end
end
