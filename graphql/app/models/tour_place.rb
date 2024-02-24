# frozen_string_literal: true

# == Schema Information
#
# Table name: tour_places
#
#  id            :bigint           not null, primary key
#  description   :text
#  duration_time :string
#  title         :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  event_id      :bigint
#  firm_id       :bigint
#  tour_plan_id  :bigint
#
# Indexes
#
#  index_tour_places_on_event_id      (event_id)
#  index_tour_places_on_firm_id       (firm_id)
#  index_tour_places_on_tour_plan_id  (tour_plan_id)
#
class TourPlace < ApplicationRecord
  GRAPHQL_TYPE = Types::TripsRelated::TourPlaceType
  TRANSLATABLE_FIELDS = %i[title description].freeze
  AVAILABLE_LANGUAGES = %i[en ru].freeze
  # MODULES ===============================================================
  include Mixins::Translatable

  # MONETIZE ==============================================================
  #
  # BELONGS_TO ASSOCIATIONS ===============================================
  belongs_to :firm
  belongs_to :event
  belongs_to :tour_plan

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
  #

  private

  def adjust_references
    self.firm = tour_plan&.firm unless firm

    self.event = tour_plan&.event unless event
  end
end
