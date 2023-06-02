# frozen_string_literal: true

module Types
  class EventTypeEnum < Types::BaseEnum
    value 'excursion', 'type for incity excursion with guide'
    value 'tour', 'type for offroad tour'
    value 'in_town'
    value 'out_of_town'
    value 'active_holiday'
    value 'music'
    value 'workshop'
    value 'business_breakfast'
    value 'meetup'
    value 'sport_activity'
    value 'gastronomic'
  end
end
