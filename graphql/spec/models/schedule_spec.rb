# frozen_string_literal: true

# == Schema Information
#
# Table name: schedules
#
#  id            :bigint           not null, primary key
#  scheduled_for :datetime         not null
#  status        :string           default("active"), not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  event_id      :bigint           not null
#
# Indexes
#
#  index_schedules_on_event_id  (event_id)
#
# Foreign Keys
#
#  fk_rails_...  (event_id => events.id)
#
require 'rails_helper'

RSpec.describe Schedule, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
