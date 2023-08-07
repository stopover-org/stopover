# frozen_string_literal: true

# == Schema Information
#
# Table name: notifications
#
#  id              :bigint           not null, primary key
#  content         :string           not null
#  delivery_method :string           not null
#  from            :string
#  origin_key      :string           not null
#  sent_at         :datetime
#  subject         :string
#  to              :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require 'rails_helper'

RSpec.describe Notification, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
