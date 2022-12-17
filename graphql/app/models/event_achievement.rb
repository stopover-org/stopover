# frozen_string_literal: true

# == Schema Information
#
# Table name: event_achievements
#
#  id             :bigint           not null, primary key
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  achievement_id :bigint
#  event_id       :bigint
#
# Indexes
#
#  index_event_achievements_on_achievement_id  (achievement_id)
#  index_event_achievements_on_event_id        (event_id)
#
# Foreign Keys
#
#  fk_rails_...  (achievement_id => achievements.id)
#  fk_rails_...  (event_id => events.id)
#
class EventAchievement < ApplicationRecord
  belongs_to :event
  belongs_to :achievement
end
