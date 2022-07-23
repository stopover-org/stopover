class EventsQuery
  def initialize(params = {}, relations = Event.all, current_user = nil)
    @relations = relations
    @params = params
    @current_user = current_user
  end

  def all
    @relations = @relations.where(id: @params[:id]) if @params[:id]
    @relations
  end
end
