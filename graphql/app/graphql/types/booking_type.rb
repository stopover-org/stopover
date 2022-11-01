module Types
  class BookingType < Types::ModelObject
    field :id, ID, null: false
    field :booked_for, Types::DateTimeType, null: false
    field :event, Types::EventType, null: false
    field :event_options, [Types::EventOptionType]
  end
end
