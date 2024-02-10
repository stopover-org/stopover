# frozen_string_literal: true

module FirmPolicy
  MANAGER_PROTECTED_FIELDS = %i[
    balance
    payments
    payment
    payouts
    payout
    refunds
    refund
    bookings
    booking
    schedules
    schedule
    stripe_connects
    margin
    accounts
  ].freeze

  def authorized?
    object.accounts.include?(current_user&.account)
  end

  MANAGER_PROTECTED_FIELDS.each do |field|
    define_method(field) do |*args|
      field_defined = respond_to?(field)

      self.class.alias_method "original_#{field}".to_sym, field if field_defined

      if authorized?
        if respond_to?("original_#{field}") && !__callee__.match?(/\A(original_).+\Z/)
          send("original_#{field}".to_sym, *args)
        else
          object.send(field, *args)
        end
      end
    end
  end
end
