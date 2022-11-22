module Mutations
    class UpdateAttendee < BaseMutation
        argument :attendee_id, ID, loads: Types::AttendeeType
        argument :first_name, String
        argument :last_name, String
        argument :email, String
        argument :phone_number, String
        field :attendee, Types::AttendeeType
        
        def resolve(attendee: , **args)
            attendee.update(**args)
            {
                attendee: attendee
            }
        end
    end
end