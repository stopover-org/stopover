module Types
  class BookingType < Types::ModelObject
    field :id, ID, null: false
    field :first_name, String
    field :last_name, String
    field :phone, String
    field :email, String
    field :booked_for, DateTime, null: false
    field :event, Types::EventType, null: false
    field :event_options, [Types::EventOptionType]
  end
end
