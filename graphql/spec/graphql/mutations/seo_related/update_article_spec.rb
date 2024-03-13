# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::SeoRelated::UpdateArticle, type: :mutation do
  let(:current_user) { create(:service_user) }
  let(:mutation) do
    <<-GRAPHQL
      mutation UpdateArticle($input: UpdateArticleInput!) {
        updateArticle(input: $input) {
          article {
            id
            title
            content
            language
          }
          errors
          notification
        }
      }
    GRAPHQL
  end

  let!(:article) { create(:article) }

  let(:input) do
    {
      articleId: GraphqlSchema.id_from_object(article),
      title: 'unique title',
      content: 'description',
      language: 'ru',
      interestIds: []
    }
  end

  let(:expected) do
    {
      title: 'unique title',
      content: 'description',
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
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Article.count }.by(0)

      expect(result.dig(:data, :updateArticle, :article)).to be_nil
      expect(result.dig(:data, :updateArticle, :errors)).to include(error)
    end
  end

  shared_examples :successful do
    it 'successful' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Article.count }.by(0)

      expected.each do |key, value|
        expect(result.dig(:data, :updateArticle, :article, key)).to eq(value)
      end

      expect(result.dig(:data, :updateArticle, :notification)).to eq('Article saved')
    end
  end

  context 'create article' do
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
