module Mutation
  class BookEvent < BaseMutation
    field :booking, Types::BookingType
    field :event, Types::EventType
    argument :first_name, String, required: false
    argument :last_name, String, required: false
    argument :email, String, required: false
    argument :phone, String, required: false
    argument :datetime, String, required: true
    argument :event_id, ID, loads: Types::EventType
  end
end