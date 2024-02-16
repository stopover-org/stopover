# frozen_string_literal: true

# == Schema Information
#
# Table name: event_placements
#
#  id            :bigint           not null, primary key
#  height_places :integer          default(0)
#  places        :jsonb
#  title         :string
#  width_places  :integer          default(0)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  event_id      :bigint
#  firm_id       :bigint
#
# Indexes
#
#  index_event_placements_on_event_id  (event_id)
#  index_event_placements_on_firm_id   (firm_id)
#
class EventPlacement < ApplicationRecord
  GRAPHQL_TYPE = Types::EventsRelated::EventPlacementType
  # MODULES ===============================================================
  #
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
  validates :title, presence: true
  validates :width_places, :height_places, presence: true

  # CALLBACKS =============================================================
  before_validation :adjust_firm
  before_validation :generate_places

  # SCOPES ================================================================
  #
  # DELEGATION ============================================================

  private

  def adjust_firm
    self.firm = event.firm if event&.firm && !firm
  end

  def generate_places
    return if !width_places_changed? && !height_places_changed?

    places_hash = {}
    width_places.times do |row|
      height_places.times do |column|
        places_hash[row.to_s] = [] if places_hash[row.to_s].nil?
        places_hash[row.to_s] << { available: true, coordinates: [row, column] }
      end
    end

    self.places = places_hash
  end
end
