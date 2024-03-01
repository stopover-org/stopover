# frozen_string_literal: true

# == Schema Information
#
# Table name: notifications
#
#  id                :bigint           not null, primary key
#  content           :string           not null
#  delivery_method   :string           not null
#  from              :string
#  notification_type :string           default("system")
#  sent_at           :datetime
#  subject           :string
#  to                :string           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  booking_id        :bigint
#  firm_id           :bigint
#
# Indexes
#
#  index_notifications_on_booking_id  (booking_id)
#  index_notifications_on_firm_id     (firm_id)
#
require 'rails_helper'

RSpec.describe Notification, type: :model do
  describe 'model setup' do
    it 'associations' do
      should belong_to(:firm).optional(true)
      should belong_to(:booking).optional(true)
    end

    it 'enum' do
      should define_enum_for(:delivery_method).with_values(email: 'email',
                                                           sms: 'sms')
                                              .backed_by_column_of_type(:string)
                                              .with_prefix(true)

      should define_enum_for(:notification_type).with_values(custom: 'custom',
                                                             system: 'system')
                                                .backed_by_column_of_type(:string)
                                                .with_prefix(true)
    end

    context 'validations' do
      it 'check' do
        should validate_presence_of(:from)
        should validate_presence_of(:to)
        should validate_presence_of(:delivery_method)
        should validate_presence_of(:notification_type)
      end
    end
  end
end
