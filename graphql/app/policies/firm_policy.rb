# frozen_string_literal: true

module FirmPolicy
  include ::Fields::FirmFields
  MANAGER_PROTECTED_FIELDS = %i[
    balance
    payments
    payment
    bookings
    booking
    schedules
    schedule
    stripe_connects
    margin
    accounts
    event
    available_payment_methods
  ].freeze

  def authorized?
    object.accounts.include?(current_account)
  end

  MANAGER_PROTECTED_FIELDS.each do |field|
    define_method(field) do |*args|
      field_defined = respond_to?(field)

      if authorized?
        args_hash = args[0] || {}
        if field_defined
          begin
            return super(**args_hash)
          rescue StandardError => e
            return object.send(field)
          end
        else
          return object.send(field)
        end
      end

      nil
    end
  end
end
