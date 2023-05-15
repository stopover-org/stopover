# frozen_string_literal: true

# == Schema Information
#
# Table name: log_events
#
#  id         :bigint           not null, primary key
#  content    :text
#  event_type :string           default("common"), not null
#  level      :string           default("info"), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class LogEvent < ApplicationRecord
end
