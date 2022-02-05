# frozen_string_literal: true

class InterestsQuery
  def initialize(params = {}, relations = Interest.all, current_user = nil)
    @relations = relations
    @params = params
    @current_user = current_user
  end

  def all
    @relations = @relations.title_autocomplete(@params[:query]) if @params[:query]
    @relations
  end
end
