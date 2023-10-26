# frozen_string_literal: true

module Connections
  class SearchkickConnection < GraphQL::Pagination::Connection
    def initialize(**args)
      @arguments = args[:arguments]
      @query_type = @arguments[:query_type]
      per_page = @query_type::PER_PAGE
      super([], default_page_size: per_page, max_page_size: per_page, **args)
    end

    def nodes
      query.all
    end

    def has_next_page
      query.total > after_value + @query_type::PER_PAGE
    end

    def has_previous_page
      after_value != 1
    end

    def start_cursor
      after_value
    end

    def end_cursor
      after_value + nodes.count
    end

    def cursor_for(item)
      index = nodes.find_index { |node| node.id == item.id }

      (after_value + index).to_s
    end

    def query
      @query ||= @query_type.new(@arguments.except(:query_type), after: after_value)
    end

    def after_value
      raw_cursor = context&.query&.provided_variables ? context.query.provided_variables['cursor'] : nil
      raw_cursor.to_i || @first_value || 0
    end

    delegate :total, to: :query
  end
end
