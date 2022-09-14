class EventFiltersQuery
  def initialize(params={})
    @min_date = DateTime.today.change({hour: 0, minutes: 0})
    @max_date = DateTime.today.change({hour: 0, minutes: 0}) + 1.year
    @min_price = 0
    @max_price = 0
    @city = params[:city] || nil
    @events = Event.by_city(@city)
  end

  def filter
    return {
      min_date: @min_date,
      max_date: @max_date,
      min_price: @min_price,
      max_price: @max_price,
      city: @city
    } unless @city


    return {
      min_date: @min_date,
      max_date: @max_date,
      min_price: @events.minimum(:attendee_cost_per_uom_cents),
      max_price: @events.maximum(:attendee_cost_per_uom_cents),
      city: @city
    }
  end
end