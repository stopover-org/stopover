# frozen_string_literal: true

module Stopover
  module TranslationManagement
    class TranslationManager
      def initialize(dynamic_translation:)
        @dynamic_translation = dynamic_translation
      end

      def translate
        disabled = true
        return if disabled
        translation = DeepL.translate(@dynamic_translation.source,
                                      @dynamic_translation.translatable.language,
                                      @dynamic_translation.target_language)

        @dynamic_translation.update!(translation: translation.text)
      end
    end
  end
end
