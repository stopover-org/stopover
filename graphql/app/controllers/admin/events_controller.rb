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

    images_to_attach = []
    params[:images].each do |img|
      next unless img[:src].is_a? String

      next if img[:id]

      tmpFile = FilesSupport.base64_to_file(img[:src], img[:title])
      next unless tmpFile

      images_to_attach.push tmpFile
    end.compact!

    event.images.each do |img|
      img.purge unless params[:images].map { |img_p| img_p[:id] }.include?(img.id)
    end

    images_to_attach.each do |img|
      event.images.attach(img)
    end

    event.update!(**update_event_params)
    render json: event, serializer: AdminEventsSerializer
  end

  private

  def update_event_params
    params.permit(:title, :description, :organizer_cost_per_uom_cents, :attendee_cost_per_uom_cents, :duration_time,
                  :house_number, :street, :city, :country, :region, :full_address, :longitude, :latitude)
  end
end
