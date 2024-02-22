# frozen_string_literal: true

require 'nokogiri'
require 'rake'

desc 'print all routes'
task routes: :environment do
  puts `bundle exec rails routes`
end

desc 'generate sitemap for frontend app'
task generate_sitemap: :environment do
  static_routes = %w[/ /events /firms /pages/privacy /pages/privacy /pages/refund-terms /pages/terms /firms/landing]
  base_url = Rails.application.credentials.frontend_url[0..-1]

  builder = Nokogiri::XML::Builder.new do |xml|
    xml.urlset xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" do
      static_routes.each do |static_route|
        xml.url do
          xml.loc "#{base_url}#{static_route}"
          xml.lastmod Time.zone.now.iso8601
          xml.changefreq 'weekly'
          xml.priority 0.5
        end
        if static_route == '/events'
          30.times.each do |d|
            xml.url do
              xml.loc "#{base_url}/events?dates=%5B\"#{Time.zone.now.to_date}\"%2C\"#{(Time.zone.now + (d + 1).day).to_date}\"%5D"
              xml.lastmod Time.zone.now.iso8601
              xml.changefreq 'daily'
              xml.priority 0.7
            end
          end
        end
      end

      Firm.active.each do |firm|
        xml.url do
          xml.loc "#{base_url}/firms/#{GraphqlSchema.id_from_object(firm)}"
          xml.lastmod Time.zone.now.iso8601
          xml.changefreq 'weekly'
          xml.priority 0.7
        end
      end

      Event.published.each do |event|
        xml.url do
          xml.loc "#{base_url}/events/#{GraphqlSchema.id_from_object(event)}"
          xml.lastmod Time.zone.now.iso8601
          xml.changefreq 'weekly'
          xml.priority 0.7
        end
      end

      Interest.all.each do |interest|
        xml.url do
          xml.loc "#{base_url}/events?interests=%5B\"#{interest.slug}\"%5D"
          xml.lastmod Time.zone.now.iso8601
          xml.changefreq 'daily'
          xml.priority 0.7
        end
        xml.url do
          30.times.each do |d|
            xml.loc "#{base_url}/events?interests=%5B\"#{interest.slug}\"%5D&dates=%5B\"#{Time.zone.now.to_date}\"%2C\"#{(Time.zone.now + (d + 1).day).to_date}\"%5D"
            xml.lastmod Time.zone.now.iso8601
            xml.changefreq 'daily'
            xml.priority 0.7
          end
        end
      end
    end
  end

  sitemap_path = Rails.application.credentials.sitemap_path
  unless File.exist?(sitemap_path)
    file = File.new(sitemap_path, 'w')
    file.write("")
    file.close
  end

  file = File.open(sitemap_path, 'r+') do |f|
    f.rewind
    f.write builder.to_xml
    f.truncate f.pos
  end
end
