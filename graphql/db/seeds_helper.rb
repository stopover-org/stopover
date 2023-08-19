class SeedsHelper
  def self.get_data(path)
    data = []
    file = Roo::Spreadsheet.open(path)
    headers = file.row(1)
    (file.count - 1).times do |n|
      out = {}
      file.row(n + 2).each_with_index do |value, index|
        out[headers[index].to_sym] = value if value
      end
      data << out
    end

    data
  end
end
