# frozen_string_literal: true

class RefundsQuery
  PER_PAGE = 10

  def initialize(
    params = {},
    after: 0,
    limit: PER_PAGE
  )
    @params = params
    @conditions = {}
    @offset = after
    @limit = limit
  end

  def execute(offset: 0, limit: @limit)
    Refund.search(where: conditions, offset: offset, limit: limit)
  end

  def all
    execute(offset: @offset).to_a
  end

  def total
    execute(offset: 0, limit: nil).count
  end

  def conditions
    @conditions[:firm_id] = @params[:firm_id] if @params[:firm_id].present?
    @conditions[:payment_id] = @params[:payment_id] if @params[:payment_id].present?
    @conditions[:booking_id] = @params[:booking_id] if @params[:booking_id].present?

    @conditions
  end
end
