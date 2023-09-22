# frozen_string_literal: true

module Connections
  class SearchkickConnection < GraphQL::Pagination::Connection
    def initialize(**args)
      arguments = args[:arguments]
      @query_type = arguments[:query_type]
      per_page = @query_type::PER_PAGE
      super([], default_page_size: per_page, max_page_size: per_page, **args)
    end

    def nodes
      @query_type.new(arguments.except(:query_type), after: (@after_value&.to_i || 0) + 1).all.to_a
    end

    def has_next_page
      @arguments[:query_type].total_pages
    end

    def has_previous_page
      @after_value.to_i != 1
    end

    def start_cursor
      @after_value.to_i
    end

    def end_cursor
      @after_value.to_i + @query_type::PER_PAGE
    end

    def cursor_for(_item)
      'not implemented'
    end
  end
end
