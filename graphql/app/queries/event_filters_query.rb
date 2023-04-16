# frozen_string_literal: true

class EventFiltersQuery
  def initialize(params = {})
    @events = Event.all
    @start_date = Time.zone.now.change({ hour: 0, minutes: 0 })
    @end_date = Time.zone.now.change({ hour: 23, minutes: 59 }) + 1.year
    @min_price = 0
    @max_price = 0
    @city = params[:city] || nil
    @events = @events.by_city(@city) if @city
    @events = @events.joins(:schedules).where('schedules.scheduled_for BETWEEN ? AND ?', @start_date, @end_date)
  end

  def filters
    unless @city
      return {
        start_date: @start_date,
        end_date: @end_date,
        min_price: Money.new(@events.minimum(:attendee_price_per_uom_cents)),
        max_price: Money.new(@events.maximum(:attendee_price_per_uom_cents)),
        city: @city
      }
    end

    {
      start_date: @start_date,
      end_date: @end_date,
      min_price: Money.new(@events.minimum(:attendee_price_per_uom_cents)),
      max_price: Money.new(@events.maximum(:attendee_price_per_uom_cents)),
      city: @city
    }
  end
end
