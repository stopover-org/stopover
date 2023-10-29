# frozen_string_literal: true

class TripsQuery
  def initialize(
    params = {},
    relations = Trip.where.not(status: :cancelled),
    current_user = nil
  )
    @relations = relations
    @params = params
    @current_user = current_user
  end

  def all
    # if @params[:booking].present?
    #       @relations = @relations.joins(:booking_ids).where(schedule: {
    #                                                        scheduled_for: @params[:scheduled_for]
    #                                                      })
    #     end

    # if @params[:bookings].present?
    #   @relations = @relations.joins(:bookings).where(booking: {
    #     booking: @params[:booking]
    #   })
    # end
    @relations = @relations.where(end_date: @params[:end_date]) if @params[:end_date].present?
    @relations = @relations.where(start_date: @params[:start_date]) if @params[:start_date].present?
    @relations = @relations.where(bookings: @params[:bookings]) if @params[:bookings].present?

    @relations
  end
end
