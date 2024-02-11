# frozen_string_literal: true

module Types
  module EventsRelated
    class EventOptionType < Types::ModelObject
      field :attendee_price, Types::MoneyType, null: false
      field :built_in, Boolean, null: false
      field :description, String
      field :for_attendee, Boolean, null: false
      field :id, ID, null: false
      field :organizer_price, Types::MoneyType
      field :title, String, null: false
      field :status, Types::Statuses::EventOptionStatusEnum, null: false
      field :event, Types::EventsRelated::EventType, null: false

      def title
        if current_firm == object.event.firm
          object.title
        else
          object.translate(:title)
        end
      end

      def description
        if current_firm == object.event.firm
          object.description
        else
          object.translate(:description)
        end
      end
    end
  end
end
