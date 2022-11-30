class AdminInterestsSerializer < ActiveModel::Serializer
  attributes(*Interest.attribute_names, :images)

  def images
    return [] unless object.preview.present?

    [
      src: Rails.application.routes.url_helpers.rails_blob_url(object.preview),
      id: object.preview.id
    ]
  end
end
