class Attendee < ApplicationRecord
    belongs_to :booking

    def full_name
        "#{first_name} #{last_name}"
    end
end
