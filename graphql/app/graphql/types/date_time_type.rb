module Types
  class DateTimeType < GraphQL::Types::ISO8601DateTime
    description "represents a timestamp of the ISO8601 format"

    def self.coerce_input(input_value, context)
      return input_value if input_value&.is_a?(DateTime) || input_value&.is_a?(Time) || input_value&.is_a?(Date)

      return unless input_value&.is_a?(String)

      super(input_value, context) # converts to iso8601
    end

    def self.coerce_result(ruby_value, context)
      return unless ruby_value&.is_a?(DateTime) || ruby_value&.is_a?(Time) || ruby_value&.is_a?(Date)

      super(ruby_value, context) # converts to iso8601
    end
  end
end
