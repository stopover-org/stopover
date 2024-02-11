# frozen_string_literal: true

class TripsQuery
  def initialize(
    params = {},
    current_user = nil
  )
    @relations = Trip.where.not(status: 'cancelled')
                     .where(account_id: current_user.account.id)
    @params = params
    @current_user = current_user
  end

  def all
    @relations = @relations.where(end_date: @params[:end_date]) if @params[:end_date].present?
    @relations = @relations.where(start_date: @params[:start_date]) if @params[:start_date].present?

    @relations
  end
end
