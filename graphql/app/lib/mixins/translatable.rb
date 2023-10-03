# frozen_string_literal: true

module Mixins
  module Translatable
    extend ActiveSupport::Concern

    included do
      after_commit :adjust_translations
    end

    def adjust_translations
      self.class::TRANSLATABLE_FIELDS.each do |field|
        self.class::AVAILABLE_LANGUAGES.each do |language|
          next if self.language.to_s == language.to_s

          dynamic_translation = dynamic_translations.find_or_initialize_by(source_field: field, target_language: language)
          next if dynamic_translation.source == self[field]
          dynamic_translation.source = self[field] || ''
          dynamic_translation.save!
          dynamic_translation.refresh
        end
      end
    end

    def translate(field)
      if language == I18n.locale
        self[field]
      else
        translation = dynamic_translations.find_by(source_field: field, target_language: I18n.locale)

        translation&.translation&.present? ? translation.translation : self[field]
      end
    end
  end
end
