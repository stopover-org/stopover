# frozen_string_literal: true

# == Schema Information
#
# Table name: firms
#
#  id             :bigint           not null, primary key
#  city           :string
#  contact_person :string
#  contacts       :text
#  country        :string
#  description    :text
#  full_address   :string
#  house_number   :string
#  latitude       :float
#  longitude      :float
#  primary_email  :string
#  primary_phone  :string
#  region         :string
#  status         :string           default("pending")
#  street         :string
#  title          :string           not null
#  website        :string
#
require 'rails_helper'

RSpec.describe Firm, type: :model do
  describe 'firm' do
    let!(:firm) { create(:firm) }
    let!(:event) { create_list(:recurring_event, 10, firm_id: firm.id) }

    it 'was deleted' do
      expect(RemoveFirmJob).to receive(:perform_later).with(firm.id)
      firm.soft_delete!
      expect(firm.status).to eq('deleted')
    end
  end
end
