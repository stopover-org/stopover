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
    @conditions[:status] = @params[:status]
    @conditions[:trip_id] = @params[:trip_id]
    @conditions[:booked_for] = @params[:booked_for]
    @conditions[:event_id] = @params[:event_id]
    @conditions[:schedule_id] = @params[:schedule_id]

    @conditions
  end

  def query
    @query ||= @params[:query].nil? || @params[:query]&.empty? ? nil : @params[:query]

    @query
  end
end
