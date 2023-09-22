# frozen_string_literal: true

class EventsQuery
  PER_PAGE = 10

  def self.total_pages
    Event.published.count
  end

  def initialize(
    params = {},
    after: 1
  )
    @params = params
    @conditions = { dates: { gt: Time.current } }
    @offset = after
  end

  def all
    @conditions[:dates] = { gt: @params[:start_date], lt: @params[:end_date] } if @params[:start_date].present? && @params[:end_date].present?
    @conditions[:price] = { gt: @params[:min_price], lt: @params[:max_price] } if @params[:min_price].present? && @params[:max_price].present?
    @conditions[:city] = @params[:city] if @params[:city].present? && !@params[:city].empty?

    query = @params[:query].nil? || @params[:query]&.empty? ? '*' : @params[:query]

    Event.search(query, where: @conditions, offset: @offset, limit: PER_PAGE)
  end
end
