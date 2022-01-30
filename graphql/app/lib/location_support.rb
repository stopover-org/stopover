class LocationSupport
  attr_accessor :results, :query
  def initialize(lon: nil, lat: nil, query:)
    provider = ::Configuration.get_value(:GEOCODE_PROVIDER).value
    if provider == 'osm'
      if query
        @query = query
        results = Geocoder.search(query)
        @results = results
      elsif lon && lat
        @query = "#{lat},#{lon}"
        results = Geocoder.search(query).first
        raise results.data['error'] if results.data['error']
        @results = results.data['address']
      end
    end
  end
end