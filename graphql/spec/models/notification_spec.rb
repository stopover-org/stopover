# frozen_string_literal: true

# == Schema Information
#
# Table name: notifications
#
#  id              :bigint           not null, primary key
#  content         :string           not null
#  delivery_method :string           not null
#  from            :string
#  sent_at         :datetime
#  subject         :string
#  to              :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require 'rails_helper'

RSpec.describe Notification, type: :model do
  describe 'model setup' do
    it 'enum' do
      should define_enum_for(:delivery_method).with_values(email: 'email',
                                                           sms: 'sms')
                                              .backed_by_column_of_type(:string)
                                              .with_prefix(true)
    end
    context 'validations' do
      it 'check' do
        should validate_presence_of(:from)
        should validate_presence_of(:to)
        should validate_presence_of(:delivery_method)
      end
    end
  end
end
