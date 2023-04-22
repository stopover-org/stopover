# frozen_string_literal: true

class SchedulesQuery
  def initialize(
    params = {},
    relations = Schedule.where('scheduled_for > ?', Time.zone.now),
    current_user = nil
  )
    @relations = relations
    @params = params
    @current_user = current_user
  end

  def all
    if @params[:start_date].present? && @params[:end_date].present?
      @relations = @relations.where('scheduled_for BETWEEN ? AND ?',
                                    @params[:start_date],
                                    @params[:end_date])
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