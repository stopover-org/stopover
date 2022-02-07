module Types
  class BookingType < Types::ModelObject
    field :id, ID
    field :first_name, String
    field :last_name, String
    field :phone, String
    field :email, String
    field :booked_for, DateTime
    field :event, Types::EventType
    field :event_options, [Types::EventOptionType]
  end
end