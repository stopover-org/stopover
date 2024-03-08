# frozen_string_literal: true

class EventsQuery
  PER_PAGE = 10

  def initialize(
    params = {},
    after: 0,
    limit: PER_PAGE
  )
    @backend = params[:backend]
    @params = params
    @conditions = { status: @backend ? Event.aasm.state_machine.states.map(&:name) : [:published] }
    @offset = after
    @limit = limit
  end

  def execute(offset: 0, limit: @limit)
    if query && !@backend
      Event.search(query, order: { source_title: :asc }, where: conditions, offset: offset, limit: limit)
    else
      Event.search('*', order: { source_title: :asc }, where: conditions, offset: offset, limit: limit)
    end
  end

  def all
    execute(offset: @offset).to_a
  end

  def total
    execute(offset: 0, limit: nil).count
  end

  def conditions
    @conditions[:dates] = { gte: Time.zone.now } if @params[:firm_id].blank?
    @conditions[:dates] = { gte: @params[:start_date], lte: @params[:end_date] } if @params[:start_date].present? && @params[:end_date].present?
    @conditions[:price] = { gte: @params[:min_price] * 100, lte: @params[:max_price] * 100 } if @params[:min_price].present? && @params[:max_price].present?
    @conditions[:city] = @params[:city] if @params[:city].present? && !@params[:city].empty?
    @conditions[:interests] = @params[:interests] if @params[:interests]&.any?
    @conditions[:firm_id] = @params[:firm_id] if @params[:firm_id].present?
    @conditions[:featured] = @params[:featured] unless @params[:featured].nil?
    @conditions[:dates] = { gte: Time.zone.now.at_beginning_of_day, lte: 1.day.from_now.at_end_of_day } unless @params[:today].nil?

    @conditions[:title] = query if @backend && query
    @conditions[:onboarding] = false unless @backend

    @conditions
  end

  def query
    @query ||= @params[:query].nil? || @params[:query]&.empty? ? nil : @params[:query]

    @query
  end
end
