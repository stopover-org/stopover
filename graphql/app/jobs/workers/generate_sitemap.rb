# frozen_string_literal: true

module Workers
  class GenerateSitemap
    Rake::Task['rake generate_sitemap'].execute
  end
end
