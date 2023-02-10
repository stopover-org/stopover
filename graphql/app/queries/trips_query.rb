# frozen_string_literal: true

class TripsQuery
  def initialize(
    params = {},
    relations = Trip.all,
    current_user = nil
  )
    @relations = relations
    @params = params
    @current_user = current_user
  end

  def all
    # if @params[:max_date].present? && @params[:min_date].present?
    #   @relations = @relations.joins(:schedules).where('schedules.scheduled_for BETWEEN ? AND ?',
    #                                                   @params[:max_date],
    #                                                   @params[:min_date])
    # end
    # if @params[:booking].present?
    #       @relations = @relations.joins(:booking).where(schedule: {
    #                                                        scheduled_for: @params[:scheduled_for]
    #                                                      })
    #     end
    @relations = @relations.where(booking: @params[:booking]) if @params[:booking].present?
    @relations = @relations.where(end_date: @params[:end_date]) if @params[:end_date].present?
    @relations = @relations.where(start_date: @params[:start_date]) if @params[:start_date].present?

    @relations
  end
end
