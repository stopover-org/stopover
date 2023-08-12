# == Schema Information
#
# Table name: penalties
#
#  id                             :bigint           not null, primary key
#  amount_cents                   :bigint           not null
#  created_at                     :datetime         not null
#  updated_at                     :datetime         not null
#  balance_id                     :bigint
#  booking_cancellation_option_id :bigint
#  booking_id                     :bigint
#  refund_id                      :bigint
#
# Indexes
#
#  index_penalties_on_balance_id                      (balance_id)
#  index_penalties_on_booking_cancellation_option_id  (booking_cancellation_option_id)
#  index_penalties_on_booking_id                      (booking_id)
#  index_penalties_on_refund_id                       (refund_id)
#
require 'rails_helper'

RSpec.describe Penalty, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
