# frozen_string_literal: true

class BookingQuery
  PER_PAGE = 30

  def initialize(
    params = {},
    after: 0,
    limit: PER_PAGE,
    backend: false
  )
    @backend = backend
    @params = params
    @conditions = {}
    @offset = after
    @limit = limit
  end

  def execute(offset: 0, limit: @limit)
    if query && !@backend
      Booking.search(query, where: conditions, offset: offset, limit: limit)
    else
      Booking.search(where: conditions, offset: offset, limit: limit)
    end
  end

  def all
    execute(offset: @offset).to_a
  end

  def total
    execute(offset: nil, limit: nil).count
  end

  def conditions
    @conditions[:status] = @params[:status] if @params[:status].present?
    @conditions[:trip_id] = @params[:trip_id] if @params[:trip_id].present?
    @conditions[:booked_for] = { gt: @params[:booked_for].at_beginning_of_day, lt: @params[:booked_for].at_end_of_day } if @params[:booked_for].present?
    @conditions[:event_id] = @params[:event_id] if @params[:event_id].present?
    @conditions[:event_id] = @params[:event_ids] if @params[:event_ids].present?
    @conditions[:schedule_id] = @params[:schedule_id] if @params[:schedule_id].present?
    @conditions[:firm_id] = @params[:firm_id] if @params[:firm_id].present?
    @conditions[:contact_email] = @params[:contact_email] if @params[:contact_email].present?
    @conditions[:contact_phone] = @params[:contact_phone] if @params[:contact_phone].present?

    @conditions
  end

  def query
    @query ||= @params[:query].nil? || @params[:query]&.empty? ? nil : @params[:query]

    @query
  end
end
