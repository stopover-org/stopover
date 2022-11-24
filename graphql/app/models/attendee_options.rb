class AttendeeOption < ApplicationRecord
    belongs_to :attendee
    belongs_to :event_option
end
