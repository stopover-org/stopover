# frozen_string_literal: true

class EventsQuery
  def initialize(params = {}, relations = Event.joins(:schedules).where('schedules.scheduled_for BETWEEN ? AND ?', Time.zone.now, 1.year.from_now), current_user = nil)
    @relations = relations
    @params = params
    @current_user = current_user
  end

  def all
    if @params[:start_date] && @params[:end_date]
      @relation = @relations.where('schedules.scheduled_for BETWEEN ? AND ?',
                                   @params[:start_date],
                                   @params[:end_date])
    end
    if @params[:min_price] && @params[:max_price]
      @relations = @relations.where('attendee_price_per_uom_cents BETWEEN ? AND ?',
                                    @params[:min_price],
                                    @params[:max_price])
    end
    @relations
  end
end
