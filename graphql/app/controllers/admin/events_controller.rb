class Admin::EventsController < AdminController
  def index
    events = Event.all.reorder(get_user_order)
    paginate json: events, each_serializer: AdminEventsSerializer
  end
end