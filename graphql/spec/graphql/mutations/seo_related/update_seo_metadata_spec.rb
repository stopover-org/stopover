# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::SeoRelated::UpdateSeoMetadata, type: :mutation do
  let(:current_user) { create(:service_user) }
  let!(:seo_metadatum) { create(:seo_metadatum) }
  let(:mutation) do
    <<-GRAPHQL
      mutation UpdateSeoMetadata($input: UpdateSeoMetadataInput!) {
        updateSeoMetadata(input: $input) {
          seoMetadatum {
            title
            description
            keywords
            language
          }
          errors
          notification
        }
      }
    GRAPHQL
  end
  let(:input) do
    {
      seoMetadatumId: GraphqlSchema.id_from_object(seo_metadatum),
      title: 'unique title',
      description: 'description',
      keywords: 'key1, key2, key3',
      language: 'ru'
    }
  end
  let(:expected) do
    {
      title: 'unique title',
      description: 'description',
      keywords: 'key1, key2, key3',
      language: 'ru'
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
      expect { result = subject.to_h.deep_symbolize_keys }.to change { SeoMetadatum.count }.by(0)

      expect(result.dig(:data, :updateSeoMetadata, :seoMetadatum)).to be_nil
      expect(result.dig(:data, :updateSeoMetadata, :errors)).to include(error)
    end
  end

  shared_examples :successful do
    it 'successful' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { SeoMetadatum.count }.by(0)

      expected.each do |key, value|
        expect(result.dig(:data, :updateSeoMetadata, :seoMetadatum, key)).to eq(value)
      end

      expect(result.dig(:data, :updateSeoMetadata, :notification)).to eq('Seo Metadata was updated')
    end
  end

  context 'create placement' do
    context 'as service user' do
      include_examples :successful
    end

    context 'as manager' do
      let!(:firm) { create(:firm) }
      let(:current_user) { firm.accounts.last.user }
      include_examples :fail, 'You are not authorized'
    end

    context 'as common user' do
      let(:current_user) { create(:active_user) }
      include_examples :fail, 'You are not authorized'
    end

    context 'as manager of different firm' do
      let!(:current_user) { create(:published_event).firm.accounts.last.user }
      include_examples :fail, 'You are not authorized'
    end
  end
end
