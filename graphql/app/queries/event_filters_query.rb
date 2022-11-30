# frozen_string_literal: true

class EventFiltersQuery
  def initialize(params = {})
    @start_date = DateTime.now.change({ hour: 0, minutes: 0 })
    @end_date = DateTime.now.change({ hour: 23, minutes: 59 }) + 1.year
    @min_price = 0
    @max_price = 0
    @city = params[:city] || nil
    @events = Event.by_city(@city) if @city
    @events = Event.events_between(@start_date) unless @city
  end

  def filters
    unless @city
      return {
        start_date: @start_date,
        end_date: @end_date,
        min_price: @events.minimum(:attendee_cost_per_uom_cents),
        max_price: @events.maximum(:attendee_cost_per_uom_cents),
        city: @city
      }
    end

    {
      start_date: @start_date,
      end_date: @end_date,
      min_price: @events.minimum(:attendee_cost_per_uom_cents),
      max_price: @events.maximum(:attendee_cost_per_uom_cents),
      city: @city
    }
  end
end
