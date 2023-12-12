# frozen_string_literal: true

class SchedulesQuery
  PER_PAGE = 30

  def initialize(
    params = {},
    relations = Schedule.where('scheduled_for > ?', Time.zone.now).active
  )
    @relations = relations
    @params = params
  end

  def all
    if @params[:start_date].present? && @params[:end_date].present?
      @relations = @relations.where('scheduled_for BETWEEN ? AND ?',
                                    @params[:start_date],
                                    @params[:end_date])
                             .active
    end
    if @params[:min_price].present? && @params[:max_price].present?
      @relations = @relations.joins(:event).where('events.attendee_price_per_uom_cents BETWEEN ? AND ?',
                                                  @params[:min_price],
                                                  @params[:max_price])
    end
    if @params[:tags].present?
      @relations = @relations.joins(event: :tags).where(tags: {
                                                          title: @params[:tags].map(&:titleize)
                                                        })
    end

    @relations.order(scheduled_for: :asc)
  end
end
