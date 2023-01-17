# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::UpdateEvent do
  describe 'mutation update event' do
    let!(:mutation) do
      "
        mutation UpdateEventMutation($input: UpdateEventInput!) {
          updateEvent(input: $input) {
            event {
              title
            }
          }
        }
      "
    end

    let!(:firm) { create(:firm) }
    let!(:event) { create(:event, firm_id: firm.id) }
    let!(:account) { create(:account, firm_id: firm.id) }

    subject do
      GraphqlSchema.execute(mutation, variables: {
                              input: {
                                eventId: GraphqlSchema.id_from_object(event),
                                title: 'Updated event'
                              }
                            }, context: { current_user: account.user })
    end
    it 'event was updated' do
      res = subject.to_h
      expect(res.dig('data', 'updateEvent', 'event', 'title')).to eq('Updated event')
    end

    context 'event do not exist in specific firm' do
      let!(:firm) { create(:firm) }
      let!(:event) { create(:event) }
      let!(:account) { create(:account, firm_id: firm.id) }

      subject do
        GraphqlSchema.execute(mutation, variables: {
                                input: {
                                  eventId: GraphqlSchema.id_from_object(event),
                                  title: 'Updated event'
                                }
                              }, context: { current_user: account.user })
      end

      it '' do
        res = subject.to_h
        expect(res.dig('data', 'updateEvent')).to eq(nil)
        expect(res['errors']).not_to be_nil
      end
    end
  end
end
