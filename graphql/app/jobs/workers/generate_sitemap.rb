# frozen_string_literal: true

module Workers
  class GenerateSitemap
    queue_as :default

    def perform
      Rake::Task['rake generate_sitemap'].execute
    end
  end
end
