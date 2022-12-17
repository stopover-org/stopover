# frozen_string_literal: true

# == Schema Information
#
# Table name: event_tags
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  event_id   :bigint
#  tag_id     :bigint
#
# Indexes
#
#  index_event_tags_on_event_id  (event_id)
#  index_event_tags_on_tag_id    (tag_id)
#
class EventTag < ApplicationRecord
  belongs_to :event
  belongs_to :tag
end
