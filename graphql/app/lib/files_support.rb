require 'digest'

class FilesSupport
  def self.base64_to_file base64, filename = SecureRandom.hex
    start_regex = %r{data:image/[a-z]{3,4};base64,}
    regex_result = start_regex.match(base64)

    return unless base64 && regex_result

    start = regex_result.to_s
    tempfile = Tempfile.new(filename)
    tempfile.binmode
    tempfile.write(Base64.decode64(base64[start.length..-1]))

    ActionDispatch::Http::UploadedFile.new(
      tempfile: tempfile,
      filename: "#{filename}.jpg",
      original_filename: "#{filename}.jpg"
    )
  end
end