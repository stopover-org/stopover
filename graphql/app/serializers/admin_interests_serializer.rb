# frozen_string_literal: true

class AdminInterestsSerializer < ActiveModel::Serializer
  attributes(*Interest.attribute_names, :images)

  def images
    return [] if object.preview.blank?

    [
      src: Rails.application.routes.url_helpers.rails_blob_url(object.preview),
        id: object.preview.id
    ]
  end
end
