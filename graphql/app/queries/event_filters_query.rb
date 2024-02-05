# frozen_string_literal: true

class EventFiltersQuery
  def initialize(params = {})
    @events = Event
    @start_date = Time.zone.now.at_beginning_of_day
    @end_date = Time.zone.now.at_end_of_day + 1.year
    @min_price = Money.new(@events.minimum(:attendee_price_per_uom_cents))
    @max_price = Money.new(@events.maximum(:attendee_price_per_uom_cents))
    @city = params[:city] || ''
    @events = @events.by_city(@city) unless @city.empty?
    @events = @events.joins(:schedules).where('schedules.scheduled_for BETWEEN ? AND ?', @start_date, @end_date)
  end

  def filters
    {
      start_date: @start_date,
      end_date: @end_date,
      min_price: @min_price,
      max_price: @max_price,
      city: @city
    }
  end
end
