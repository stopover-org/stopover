require 'digest'

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

      start_regex = /data:image\/[a-z]{3,4};base64,/
      filename ||= SecureRandom.hex
      regex_result = start_regex.match(img[:src])

      if img[:src] && regex_result
        start = regex_result.to_s
        tempfile = Tempfile.new(filename)
        tempfile.binmode
        tempfile.write(Base64.decode64(img[:src][start.length..-1]))
        uploaded_file = ActionDispatch::Http::UploadedFile.new(
          :tempfile => tempfile,
          :filename => "#{filename}.jpg",
          :original_filename => "#{img[:title] || filename}.jpg"
        )

        images_to_attach.push uploaded_file
      end
    end.compact!

    event.images.each do |img|
      img.purge unless (params[:images].map { |img_p| img_p[:id] }.include?(img.id))
    end

    images_to_attach.each do |img|
      event.images.attach(img)
    end

    event.update!(**update_event_params)
    render json: event, serializer: AdminEventsSerializer
  end

  private
  def update_event_params
    params.permit(:title, :description, :organizer_cost_per_uom_cents, :attendee_cost_per_uom_cents, :duration_time, :house_number, :street, :city, :country, :region, :full_address, :longitude, :latitude)
  end
end