class Trip < ApplicationRecord
  belongs_to :account
  has_many :bookings, dependent: :destroy
end
