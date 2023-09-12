# frozen_string_literal: true

# == Schema Information
#
# Table name: refunds
#
#  id                             :bigint           not null, primary key
#  penalty_amount_cents           :decimal(, )      default(0.0), not null
#  refund_amount_cents            :decimal(, )      default(0.0), not null
#  status                         :string           default("pending"), not null
#  created_at                     :datetime         not null
#  updated_at                     :datetime         not null
#  account_id                     :bigint
#  booking_cancellation_option_id :bigint
#  booking_id                     :bigint
#  firm_id                        :bigint
#  payment_id                     :bigint
#
# Indexes
#
#  index_refunds_on_account_id                      (account_id)
#  index_refunds_on_booking_cancellation_option_id  (booking_cancellation_option_id)
#  index_refunds_on_booking_id                      (booking_id)
#  index_refunds_on_firm_id                         (firm_id)
#  index_refunds_on_payment_id                      (payment_id)
#
require 'rails_helper'

RSpec.describe Refund, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
