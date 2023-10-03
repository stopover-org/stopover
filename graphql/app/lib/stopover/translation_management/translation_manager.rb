# frozen_string_literal: true

module Stopover
  module TranslationManagement
    class TranslationManager
      def initialize(dynamic_translation:)
        @dynamic_translation = dynamic_translation
      end

      def translate
        translation = Deepl.translate(@dynamic_translations.source,
                                      @dynamic_translations.source_language,
                                      @dynamic_translations.target_language)

        @dynamic_translations.update!(translation: translation.text)
      end
    end
  end
end
