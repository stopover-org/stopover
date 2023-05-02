# frozen_string_literal: true

class EventsQuery
  def initialize(
    params = {},
    relations = Event.joins(:schedules).where('schedules.scheduled_for > ?', Time.zone.now)
  )
    @relations = relations
    @params = params
  end

  def all
    if @params[:start_date].present? && @params[:end_date].present?
      @relations = @relations.joins(:schedules).where('schedules.scheduled_for BETWEEN ? AND ?',
                                                      @params[:start_date],
                                                      @params[:end_date])
    end
    if @params[:min_price].present? && @params[:max_price].present?
      @relations = @relations.where('attendee_price_per_uom_cents BETWEEN ? AND ?',
                                    @params[:min_price],
                                    @params[:max_price])
    end
    if @params[:tags].present?
      @relations = @relations.joins(:tags).where(tags: {
                                                   title: @params[:tags].map(&:titleize)
                                                 })
    end

    @relations
  end
end
