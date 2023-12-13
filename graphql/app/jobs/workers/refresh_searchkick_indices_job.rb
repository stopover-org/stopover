# frozen_string_literal: true

module Workers
  class RefreshSearchkickIndicesJob < ApplicationJob
    queue_as :default

    def perform
      Rake::Task['rake searchkick:reindex:all'].invoke
    end
  end
end
