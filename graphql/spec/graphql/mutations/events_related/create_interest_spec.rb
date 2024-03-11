# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::EventsRelated::CreateInterest, type: :mutation do
  let(:current_user) { create(:service_user) }
  let(:mutation) do
    <<-GRAPHQL
      mutation CreateInterest($input: CreateInterestInput!) {
        createInterest(input: $input) {
          interest {
            title
            description
            slug
          }
          errors
          notification
        }
      }
    GRAPHQL
  end
  let(:input) do
    {
      title: 'unique title',
      description: 'description',
      slug: 'unique-slug',
      preview: 'https://example.com/image'
    }
  end
  let(:expected) do
    {
      title: 'unique title',
      description: 'description',
      slug: 'unique-slug'
    }
  end

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  shared_examples :fail do |error|
    it 'fails' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Interest.count }.by(0)

      expect(result.dig(:data, :createInterest, :interest)).to be_nil
      expect(result.dig(:data, :createInterest, :errors)).to include(error)
    end
  end

  shared_examples :successful do
    it 'successful' do
      expect(Stopover::FilesSupport).to receive(:url_to_io).with('https://example.com/image')
      expect_any_instance_of(Interest).to receive_message_chain(:preview, :attach)

      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Interest.count }.by(1)

      expected.each do |key, value|
        expect(result.dig(:data, :createInterest, :interest, key)).to eq(value)
      end

      expect(result.dig(:data, :createInterest, :notification)).to eq('Category created')
    end
  end

  context 'create placement' do
    context 'as service user' do
      include_examples :successful
    end

    context 'as manager' do
      let(:firm) { create(:firm) }
      let(:current_user) { firm.accounts.last.user }
      include_examples :fail, 'You are not authorized'
    end

    context 'as common user' do
      let(:current_user) { create(:active_user) }
      include_examples :fail, 'You are not authorized'
    end

    context 'as manager of different firm' do
      let(:current_user) { create(:published_event).firm.accounts.last.user }
      include_examples :fail, 'You are not authorized'
    end
  end
end
