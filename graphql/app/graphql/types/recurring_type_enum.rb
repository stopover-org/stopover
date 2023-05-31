# frozen_string_literal: true

module Types
  class RecurringTypeEnum < Types::BaseEnum
    value 'recurrent', 'uses for recurring events'
    value 'general', 'uses for non recurring type of events'
  end
end
