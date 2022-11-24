class Admin::EventsController < AdminController
  def index
    events = Event.all.reorder(get_user_order)
    paginate json: events, each_serializer: AdminEventsSerializer
  end

  def show
    event = Event.find(params[:id])

    render json: event, serializer: AdminEventsSerializer
  end

  def update
    event = Event.find(params[:id])

    event.upload_images(params[:images]) if params[:images]

    event.update!(**update_event_params)
    render json: event, serializer: AdminEventsSerializer
  end

  private

  def update_event_params
    params.permit(:title, :description, :organizer_cost_per_uom_cents, :attendee_cost_per_uom_cents, :duration_time,
                  :house_number, :street, :city, :country, :region, :full_address, :longitude, :latitude)
  end
end
