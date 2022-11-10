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
