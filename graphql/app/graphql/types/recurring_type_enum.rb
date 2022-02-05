# frozen_string_literal: true

module Types
  class RecurringTypeEnum < Types::BaseEnum
    value 'recurring', 'uses for recurring trips'
    value 'non_recurring', 'uses for non recurring type of trips'
  end
end
