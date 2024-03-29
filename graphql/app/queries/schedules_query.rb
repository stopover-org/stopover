# frozen_string_literal: true

class SchedulesQuery
  PER_PAGE = 10

  def initialize(
    params = {},
    after: 0,
    limit: PER_PAGE
  )
    @params = params
    @conditions = { scheduled_for: { gte: Time.zone.today } }
    @offset = after
    @limit = limit
  end

  def execute(offset: 0, limit: @limit)
    Schedule.search('*', order: { scheduled_for: { order: :asc, unmapped_type: :date } }, where: conditions, offset: offset, limit: limit)
  end

  def all
    execute(offset: @offset).to_a
  end

  def total
    execute(offset: nil, limit: nil).count
  end

  def conditions
    @conditions.delete(:scheduled_for) unless @params[:include_past].nil?
    if @params[:scheduled_for].present?
      @conditions[:scheduled_for] = { gte: @params[:scheduled_for].at_beginning_of_day,
                                      lte: @params[:scheduled_for].at_end_of_day }
    end
    @conditions[:firm_id] = @params[:firm_id] if @params[:firm_id].present?
    @conditions[:event_id] = @params[:event_ids] if @params[:event_ids].present?
    @conditions[:event_id] = @params[:event_id] if @params[:event_id].present?

    @conditions
  end
end
