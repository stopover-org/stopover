# frozen_string_literal: true

# == Schema Information
#
# Table name: addresses
#
#  id           :bigint           not null, primary key
#  city         :string
#  country      :string
#  full_address :text
#  house_number :string
#  latitude     :float
#  longitude    :float
#  postal_code  :string
#  region       :string
#  street       :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  firm_id      :bigint
#
# Indexes
#
#  index_addresses_on_firm_id  (firm_id)
#
require 'rails_helper'

RSpec.describe Address, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
