# frozen_string_literal: true

# == Schema Information
#
# Table name: stripe_integrations
#
#  id              :bigint           not null, primary key
#  status          :string
#  stripeable_type :string
#  version         :integer          default(1)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  price_id        :string
#  product_id      :string
#  stripeable_id   :bigint
#
# Indexes
#
#  index_stripe_integrations_on_stripeable_id_and_stripeable_type  (stripeable_id,stripeable_type)
#
FactoryBot.define do
  factory :stripe_integration do
    price_id { 'temp_price_id' }
    product_id { 'temp_product_id' }
  end
end
