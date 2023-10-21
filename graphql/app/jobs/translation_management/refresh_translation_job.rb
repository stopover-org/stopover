# frozen_string_literal: true

module TranslationManagement
  class RefreshTranslationJob < ApplicationJob
    queue_as :default

    def perform(dynamic_translation_id:)
      enabled = false
      if enabled
        translation = DynamicTranslation.find(dynamic_translation_id)

        Stopover::TranslationManagement::TranslationManager.new(dynamic_translation: translation).translate
      end
    end
  end
end
