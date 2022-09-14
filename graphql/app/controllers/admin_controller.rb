class AdminController < ApplicationController
  before_action :set_pagination, only: [:index]

  def set_pagination
    params.permit(:page, :per_page, :_end, :_order, :_sort, :_start, :format)
    params[:per_page] = (params[:_end].to_i - params[:_start].to_i).to_f
    params[:per_page] = 10.0 if params[:per_page] == 0.0
    params[:page] = ((params[:_start].to_i + 1) / params[:per_page]).ceil
    params[:filter] = params[:_filter]
  end

  def get_user_order
    if params[:_sort].present?
      orders = {}
      orders[params[:_sort]] = params[:_order] || 'ASC'
      orders[:id] = :desc # needed to make pagination consistent
      orders
    else
      # needed to make pagination consistent
      { id: :desc }
    end
  end
end
