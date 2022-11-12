module Mutations
    class UpdateBooking < BaseMutation
        argument :booking_id, ID, loads: Types::BookingType
        argument :first_name, String
        field :booking, Types::BookingType
        def resolve(**args)
            # debugger
            args.[:booking].update(name: args[:first_name])
        end
    end
end