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
    if @params[:max_date].present? && @params[:min_date].present?
      @relations = @relations.joins(:schedules).where('schedules.scheduled_for BETWEEN ? AND ?',
                                                      @params[:max_date],
                                                      @params[:min_date])
    end
  end
end
