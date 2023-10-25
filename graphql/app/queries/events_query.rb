# frozen_string_literal: true

class EventsQuery
  PER_PAGE = 10

  def self.total_pages
    Event.published.count
  end

  def initialize(
    params = {},
    after: 0,
    limit: PER_PAGE,
    backend: false
  )
    @params = params
    @conditions = { dates: { gte: Time.current }, status: backend ? Event.aasm.state_machine.states.map(&:name) : [:published] }
    @offset = after
    @limit = limit
  end

  def execute(offset: 0, limit: @limit)
    if query
      Event.search(query, where: conditions, offset: offset, limit: limit)
    else
      Event.search(where: conditions, offset: offset, limit: limit)
    end
  end

  def all
    execute(offset: @offset).to_a
  end

  def total
    execute(offset: nil, limit: nil).count
  end

  def conditions
    @conditions[:dates] = { gte: @params[:start_date], lte: @params[:end_date] } if @params[:start_date].present? && @params[:end_date].present?
    @conditions[:price] = { gte: @params[:min_price], lte: @params[:max_price] } if @params[:min_price].present? && @params[:max_price].present?
    @conditions[:city] = @params[:city] if @params[:city].present? && !@params[:city].empty?
    @conditions[:interests] = @params[:interests] if @params[:interests]&.any?

    @conditions
  end

  def query
    @query ||= @params[:query].nil? || @params[:query]&.empty? ? nil : @params[:query]

    @query
  end
end
