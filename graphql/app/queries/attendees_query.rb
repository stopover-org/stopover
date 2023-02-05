# frozen_string_literal: true

class AttendeesQuery
  def initialize(
    params = {},
    relations = Attendee.joins(booking: :schedules).where('schedules.scheduled_for > ?', Time.zone.now),
    current_user = nil
  )
    @relations = relations
    @params = params
    @current_user = current_user
  end

  def all
    @relations = @relations.where(email: @params[:email]) if @params[:email].present?
    @relations = @relations.where(phone: @params[:phone]) if @params[:phone].present?
    @relations = @relations.where(full_name: @params[:full_name]) if @params[:full_name].present?
    @relations = @relations.where(last_name: @params[:last_name]) if @params[:last_name].present?
    @relations = @relations.where(is_registered: @params[:is_registered]) if @params[:is_registered].present?
    @relations = @relations.where(booking_id: @params[:booking_id]) if @params[:booking_id].present?
    @relations = @relations.where(event_id: @params[:event_id]) if @params[:event_id].present?
  end
end
