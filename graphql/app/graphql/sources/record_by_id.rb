# frozen_string_literal: true

module Sources
  class RecordById < GraphQL::Dataloader::Source
    def initialize(model_class)
      @model_class = model_class
    end

    def fetch(ids)
      records = @model_class.where(id: ids)
      ids.map { |id| records.find { |record| record.id == id&.to_i } }
    end
  end
end
