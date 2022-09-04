class AdminEventsSerializer < ActiveModel::Serializer
  attributes(*Event.attribute_names)
end