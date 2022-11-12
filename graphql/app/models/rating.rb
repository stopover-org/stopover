class Rating < ApplicationRecord
    belongs_to :event
    belongs_to :account
    validates :rating_value, presence: true
    validates :rating_value, numericality: { in: 1..5 }
end
