# frozen_string_literal: true

# == Schema Information
#
# Table name: dynamic_translations
#
#  id                :bigint           not null, primary key
#  source            :string           not null
#  source_field      :string           not null
#  target_language   :string           not null
#  translatable_type :string
#  translation       :string           default(""), not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  translatable_id   :bigint
#
# Indexes
#
#  index_dynamic_translations_on_translatable  (translatable_type,translatable_id)
#
class DynamicTranslation < ApplicationRecord
  # MODULES ===============================================================

  # MONETIZE ==============================================================

  # BELONGS_TO ASSOCIATIONS ===============================================

  # HAS_ONE ASSOCIATIONS ==================================================

  # HAS_ONE THROUGH ASSOCIATIONS ==========================================

  # HAS_MANY ASSOCIATIONS =================================================

  # HAS_MANY THROUGH ASSOCIATIONS =========================================

  # AASM STATES ===========================================================

  # ENUMS =================================================================

  # SECURE TOKEN ==========================================================

  # SECURE PASSWORD =======================================================

  # ATTACHMENTS ===========================================================

  # RICH_TEXT =============================================================

  # VALIDATIONS ===========================================================

  # CALLBACKS =============================================================

  # SCOPES ================================================================

  # DELEGATION ============================================================

  def refresh
    TranslationManagement::RefreshTranslationJob.perform_later(dynamic_translation_id: id)
  end
end
