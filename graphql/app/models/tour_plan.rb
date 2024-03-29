# frozen_string_literal: true

# == Schema Information
#
# Table name: tour_plans
#
#  id          :bigint           not null, primary key
#  description :text
#  title       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  event_id    :bigint
#  firm_id     :bigint
#
# Indexes
#
#  index_tour_plans_on_event_id  (event_id)
#  index_tour_plans_on_firm_id   (firm_id)
#
class TourPlan < ApplicationRecord
  GRAPHQL_TYPE = Types::TripsRelated::TourPlanType
  TRANSLATABLE_FIELDS = %i[title description].freeze
  AVAILABLE_LANGUAGES = %i[en ru].freeze
  # MODULES ===============================================================
  include Mixins::Translatable

  # MONETIZE ==============================================================
  #
  # BELONGS_TO ASSOCIATIONS ===============================================
  belongs_to :firm
  belongs_to :event

  # HAS_ONE ASSOCIATIONS ==================================================
  #
  # HAS_ONE THROUGH ASSOCIATIONS ==========================================
  #
  # HAS_MANY ASSOCIATIONS =================================================
  has_many :tour_places, dependent: :destroy

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
  has_one_attached :image
  # RICH_TEXT =============================================================
  #
  # VALIDATIONS ===========================================================
  validates :title, presence: true

  # CALLBACKS =============================================================
  before_validation :adjust_references

  # SCOPES ================================================================
  #
  # DELEGATION ============================================================
  delegate :language, to: :event

  private

  def adjust_references
    self.firm = event&.firm unless firm
  end
end
