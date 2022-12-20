# frozen_string_literal: true

require 'digest'

class FilesSupport
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
end
