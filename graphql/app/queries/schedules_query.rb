# frozen_string_literal: true

class SchedulesQuery
  PER_PAGE = 30

  def initialize(
    params = {},
    after: 0,
    limit: PER_PAGE
  )
    @params = params
    @conditions = {}
    @offset = after
    @limit = limit
  end

  def execute(offset: 0, limit: @limit)
    Schedule.search(where: conditions, offset: offset, limit: limit)
  end

  def all
    execute(offset: @offset).to_a
  end

  def total
    execute(offset: nil, limit: nil).count
  end

  def conditions
    @conditions[:scheduled_for] = { gte: @params[:start_date], lte: @params[:end_date] } if @params[:start_date].present? && @params[:end_date].present?
    @conditions[:event_id] = @params[:event_ids] if @params[:event_ids].present?

    @conditions
  end
end
