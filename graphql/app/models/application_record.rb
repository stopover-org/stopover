# frozen_string_literal: true

class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class
  after_commit :e2e_callback, on: :create
  # MODULES ===============================================================
  #
  # MONETIZE ==============================================================
  #
  # BELONGS_TO ASSOCIATIONS ===============================================
  #
  # HAS_ONE ASSOCIATIONS ==================================================
  #
  # HAS_ONE THROUGH ASSOCIATIONS ==========================================
  #
  # HAS_MANY ASSOCIATIONS =================================================
  #
  # HAS_MANY THROUGH ASSOCIATIONS =========================================
  #
  # AASM STATES ===========================================================
  #
  # ENUMS =================================================================
  #
  # SECURE TOKEN ==========================================================
  #
  # SECURE PASSWORD =======================================================
  #
  # ATTACHMENTS ===========================================================
  #
  # RICH_TEXT =============================================================
  #
  # VALIDATIONS ===========================================================
  #
  # CALLBACKS =============================================================
  #
  # SCOPES ================================================================
  default_scope { order(updated_at: :desc) if try(:updated_at) }
  #
  # DELEGATION ============================================================

  def graphql_object_type
    :record
  end

  def relay_id
    GraphqlSchema.id_from_object(self)
  end

  def e2e_callback
    if Flipper.enabled?(:global_sandbox)
      Redis.new.lpush('testing:e2e:records', { model: self.class.name.underscore,
                                               id: id }.to_json)
    end
  end
end
