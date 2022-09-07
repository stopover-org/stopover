class AdminEventsSerializer < ActiveModel::Serializer
  attributes(*Event.attribute_names).concat([:images])

  def images
    object.images
  end
end