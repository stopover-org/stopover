# frozen_string_literal: true

module Connections
  class SearchkickConnection < GraphQL::Pagination::Connection
    def initialize(**args)
      @arguments = args[:arguments]
      @query_type = @arguments[:query_type]
      @per_page = @query_type::PER_PAGE
      @max_per_page = defined?(@query_type::MAX_PER_PAGE) ? @query_type::MAX_PER_PAGE : 1000
      super([], default_page_size: @per_page, max_page_size: @max_page_size, **args)
    end

    def per_page
      return @max_page_size if @first_value && @max_page_size && @first_value.to_i > @max_page_size
      @first_value || @per_page || @max_page_size
    end

    def nodes
      query.all
    end

    def has_next_page
      query.total > start_cursor + per_page
    end

    def has_previous_page
      offset != 0
    end

    def start_cursor
      0
    end

    def end_cursor
      query.total
    end

    def cursor_for(item)
      index = nodes.find_index { |node| node.id == item.id }

      (offset + index).to_s
    end

    def query
      @query ||= @query_type.new(@arguments.except(:query_type), limit: per_page, after: offset)
    end

    def offset
      @after_value.to_i || 0
    end

    delegate :total, to: :query
  end
end
