class EventsQuery
  def initialize(params = {}, relations = Event.events_between(Time.zone.now), current_user = nil)
    @relations = relations
    @params = params
    @current_user = current_user
  end

  def all
    if @params[:start_date] && @params[:end_date]
      @relations = Event.events_between(@params[:start_date],
                                        @params[:end_date])
    end
    if @params[:min_price] && @params[:max_price]
      @relations = @relations.where('attendee_cost_per_uom_cents BETWEEN ? AND ?', @params[:min_price],
                                    @params[:max_price])
    end
    @relations
  end
end
