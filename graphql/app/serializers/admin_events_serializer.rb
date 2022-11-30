# frozen_string_literal: true

class AdminEventsSerializer < ActiveModel::Serializer
  attributes(*Event.attribute_names, :images)

  def images
    object.images.map do |img|
      {
        src: Rails.application.routes.url_helpers.rails_blob_url(img),
        id: img.id
      }
    end
  end
end
