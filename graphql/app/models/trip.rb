# frozen_string_literal: true

# == Schema Information
#
# Table name: trips
#
#  id           :bigint           not null, primary key
#  city         :string
#  country      :string
#  end_date     :date
#  full_address :string
#  latitude     :float
#  longitude    :float
#  region       :string
#  start_date   :date
#  status       :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  account_id   :bigint
#
# Indexes
#
#  index_trips_on_account_id  (account_id)
#
class Trip < ApplicationRecord
  belongs_to :account
  has_many :bookings, dependent: :destroy

  def min_date
    bookings.order(booked_for: :asc).first.booked_for
  end

  def max_date
    bookings.order(booked_for: :desc).first.booked_for
  end

  def cities
    bookings.map do |booking|
      booking.event.city
    end
  end
end
