# frozen_string_literal: true

# == Schema Information
#
# Table name: attendee_options
#
#  id                    :bigint           not null, primary key
#  attendee_price_cents  :decimal(, )      default(0.0)
#  organizer_price_cents :decimal(, )      default(0.0)
#  status                :string           default("available")
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  attendee_id           :bigint
#  event_option_id       :bigint
#  stripe_integration_id :bigint
#
# Indexes
#
#  index_attendee_options_on_attendee_id            (attendee_id)
#  index_attendee_options_on_event_option_id        (event_option_id)
#  index_attendee_options_on_stripe_integration_id  (stripe_integration_id)
#
# Foreign Keys
#
#  fk_rails_...  (stripe_integration_id => stripe_integrations.id)
#
FactoryBot.define do
  factory :attendee_option do
    attendee { create(:attendee) }
    event_option { create(:for_attendee_event_option) }
  end
end
