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
FactoryBot.define do
  factory :schedule do
    status { :active }

    transient do
      with_event { false }
    end

    before(:create) do |schedule, evaluator|
      if evaluator.with_event
        schedule.event = create(:recurring_event)
        schedule.scheduled_for = 1.day.from_now
      end
    end
  end
end
