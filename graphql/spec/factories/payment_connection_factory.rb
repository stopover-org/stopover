# frozen_string_literal: true

# == Schema Information
#
# Table name: payment_connections
#
#  id                    :bigint           not null, primary key
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  payment_id            :bigint
#  stripe_integration_id :bigint
#
# Indexes
#
#  index_payment_connections_on_payment_id             (payment_id)
#  index_payment_connections_on_stripe_integration_id  (stripe_integration_id)
#
FactoryBot.define do
  factory :payment_connection do
    stripe_integration { create(:stripe_integration) }
  end
end
