# frozen_string_literal: true

# == Schema Information
#
# Table name: ratings
#
#  id           :bigint           not null, primary key
#  rating_value :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  account_id   :bigint
#  event_id     :bigint
#
# Indexes
#
#  index_ratings_on_account_id  (account_id)
#  index_ratings_on_event_id    (event_id)
#
require 'rails_helper'

RSpec.describe Rating, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
