# frozen_string_literal: true

class AttendeesQuery
  def initialize(
    params = {},
    relations = Attendee.joins(booking: [:schedule]).where('schedules.scheduled_for > ?', Time.zone.now),
    current_user = nil
  )
    @relations = relations
    @params = params
    @current_user = current_user
  end

  def all
    @relations = @relations.where(email: @params[:email]) if @params[:email].present?
    @relations = @relations.where(phone: @params[:phone]) if @params[:phone].present?
    @relations = @relations.where(first_name: @params[:first_name]) if @params[:first_name].present?
    @relations = @relations.where(last_name: @params[:last_name]) if @params[:last_name].present?
    @relations = @relations.where(is_registered: @params[:is_registered]) if @params[:is_registered].present?
    @relations = @relations.where(booking: @params[:booking]) if @params[:booking].present?
    @relations = @relations.where(booking: { event: @params[:event] }) if @params[:event].present?

    @relations
  end
end
