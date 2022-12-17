# frozen_string_literal: true

# == Schema Information
#
# Table name: units
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  unit_type  :string           default(NULL), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :unit do
    name { 'Place' }
    unit_type { :common }
  end
end
