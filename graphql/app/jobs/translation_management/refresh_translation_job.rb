# frozen_string_literal: true

module TranslationManagement
  class RefreshTranslationJob < ApplicationJob
    queue_as :default

    def perform(dynamic_translation_id:)
      translation = DynamicTranslation.find_by(id: dynamic_translation_id)

      Stopover::TranslationManagement::TranslationManager.new(dynamic_translation: translation).translate if translation
    end
  end
end
