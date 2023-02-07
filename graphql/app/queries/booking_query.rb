# frozen_string_literal: true

class BookingQuery
  def initialize(
    params = {},
    relations = Booking.joins(:schedule).where('scheduled_for > ?', Time.zone.now),
    current_user = nil
  )
    @relations = relations
    @params = params
    @current_user = current_user
  end

  def all
    @relations = @relations.where(status: @params[:status]) if @params[:status].present?
    @relations = @relations.where(trip_id: @params[:trip_id]) if @params[:trip_id].present?
    if @params[:scheduled_for].present?
      @relations = @relations.joins(:schedule).where(schedule: {
                                                       scheduled_for: @params[:scheduled_for]
                                                     })
    end
    @relations = @relations.where(event_id: @params[:event_id]) if @params[:event_id].present?
    @relations
  end
end
