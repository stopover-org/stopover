class Attendee < ApplicationRecord
    belongs_to :booking
    has_many :attendee_options
    has_many :event_options, through :attendee_options

    def full_name
        "#{first_name} #{last_name}"
    end
end
