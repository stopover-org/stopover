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
#  primary_email  :string           not null
#  primary_phone  :string
#  region         :string
#  status         :string           default("pending")
#  street         :string
#  title          :string           not null
#  website        :string
#
class Firm < ApplicationRecord
  validates :primary_email, :title, presence: true

  has_many :events, dependent: :destroy
end
