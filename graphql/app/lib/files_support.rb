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

  def self.find_file(host:, username:, password:, remote_path:)
    output = []
    Net::SFTP.start(host, username, :password => password) do |sftp|
      sftp.dir.foreach(remote_path) do |entry|
        output << remote_path + entry.name
      end
    end
    output
  end
end
