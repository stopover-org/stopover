# frozen_string_literal: true

module Stopover
  module TranslationManagement
    class TranslationManager
      def initialize(dynamic_translation:)
        @dynamic_translation = dynamic_translation
      end

      def translate
        translation = fetch_translation

        @dynamic_translation.update!(translation: translation) if translation
      end

      def fetch_translation
        disabled = Rails.env.test? || !Flipper.enabled?(:global_translations)
        return @dynamic_translation.source if disabled

        client = ::Google::Cloud::Translate::V3::TranslationService::Client.new
        parent = Rails.application.credentials.google_translate_parent
        request = Google::Cloud::Translate::V3::TranslateTextRequest.new(contents: [@dynamic_translation.source],
                                                                         target_language_code: @dynamic_translation.target_language,
                                                                         parent: parent)
        result = client.translate_text request

        result.translations[0].translated_text if result.translations.size.positive? && result.translations[0].translated_text
      end
    end
  end
end
