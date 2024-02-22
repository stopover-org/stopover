# frozen_string_literal: true

module Workers
  class GenerateSitemap
    def perform
      Rake::Task['rake generate_sitemap'].execute
    end
  end
end
