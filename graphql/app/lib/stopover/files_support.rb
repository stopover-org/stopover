# frozen_string_literal: true

require 'digest'
require 'open-uri'

module Stopover
  class FilesSupport
    def self.attach_images(record, image_urls:, key: 'images')
      images_to_attach = []

      image_urls.each do |url|
        images_to_attach << url_to_io(url)
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
      end

      record.send(key.to_sym).attach(images_to_attach)
    end

    def self.attach_image(record, image_url:, key: 'image')
      if image_url
        record.send(key.to_sym).attach(url_to_io(image_url))
      else
        record.send(key.to_sym).purge
      end
    end

    def self.update_images(record, image_urls:, key: 'images')
      purge_images!(record, image_urls: image_urls, key: key)

      images_to_attach = []

      image_urls.each do |url|
        next if skip_purge?(record, url: url, key: key)

        images_to_attach << url_to_io(url)
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
      end

      record.send(key.to_sym).attach(images_to_attach)
    end

    def self.update_image(record, image_url:, key: 'image')
      if image_url
        record.send(key.to_sym).attach(url_to_io(image_url)) if URI.parse(image_url).path != URI.parse(record.send(key.to_sym).url).path
      else
        record.send(key.to_sym).purge
      end
    end

    def self.base64?(string)
      start_regex = %r{data:image/[a-z]{3,4};base64,}
      start_regex.match(string)
    end

    def self.url_to_io(url, filename = SecureRandom.hex)
      image = URI.parse(url).open
      {
        io: image,
        filename: filename
      }
    end

    def self.base64_to_file(base64, filename = SecureRandom.hex)
      start_regex = %r{data:image/[a-z]{3,4};base64,}
      regex_result = start_regex.match(base64)

      return unless base64 && regex_result

      start = regex_result.to_s
      tempfile = Tempfile.new(filename)
      tempfile.binmode
      tempfile.write(Base64.decode64(base64[start.length..]))

      ActionDispatch::Http::UploadedFile.new(
        tempfile: tempfile,
        filename: "#{filename}.jpg",
        original_filename: "#{filename}.jpg"
      )
    end

    def self.get_files_recursively(sftp:, folders:, files:)
      sftp.dir.foreach(folders) do |entry|
        next if entry.name == '.' || entry.name == '..'
        if File.directory?("#{folders[0]}/#{entry.name}")
          folders << "#{folders[0]}/#{entry.name}"
        else
          files << "#{folders[0]}/#{entry.name}"
        end
      end

      folders.shift
      return files if folders.empty?

      get_files_recursively(sftp: sftp, folders: folders, files: files)
    end

    def self.retrieve_files(host:, username:, password:, remote_path:)
      files = []
      folders = []
      Net::SFTP.start(host, username, password: password) do |sftp|
        folders << "/Users/maxhoga/#{remote_path}"
        files = get_files_recursively(sftp: sftp, folders: folders, files: files)
      end

      files
    end

    def self.get_images_to_remove(record, image_urls:, key: 'images')
      record.send(key.to_sym).select do |image|
        image_urls.map { |img| URI.parse(img).path }.exclude?(URI.parse(image.url).path)
      end
    end

    def self.purge_images!(record, image_urls:, key: 'images')
      images_to_remove = get_images_to_remove(record,
                                              image_urls: image_urls,
                                              key: key)

      images_to_remove.each do |image|
        image.purge
      end
    end

    def self.skip_purge?(record, url:, key: 'images')
      record.send(key.to_sym).select { |image| URI.parse(url).path == URI.parse(image.url).path }.any?
    end
  end
end
