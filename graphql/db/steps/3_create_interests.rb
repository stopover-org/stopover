with_images = ENV.fetch('without_images', 'false') == 'false'

titles = ['Active mobility', 'Adventure travel', 'Air travel', 'Backpacking (travel)', 'Bleisure travel', 'Business tourism', 'Business travel', 'Circuit riding', 'Travel class', 'College tour', 'Commuting', 'Creative trip', 'Cruising (maritime)', 'Cultural travel', 'Experiential travel', 'Field trip', 'First class (aviation)', 'Flight shame', 'Global nomad', 'Grand Tour', 'Honeymoon', 'Mancation', 'Overseas experience', 'Package tour', 'Park and Pedal commuting', 'Pet travel', 'Recreational travel', 'Repositioning cruise', 'River cruise', 'Road trip', 'Safari', 'School camp', 'Train surfing', 'Travel incentive', 'Vacation', 'Visiting friends and relatives']

if with_images
  Rails.logger.info "let's generate cover for all interest"
  Rails.logger.info "for query: The man that interested in #{titles.join(' ')} "
  interest_image = Stopover::AiCoverService.new("Photorealistic women that interested in #{titles.join(' ')}").fetch
  Rails.logger.info interest_image
  Rails.logger.info 'interest cover was generated'
else
  Rails.logger.info 'skip image generation for interests'
end

(0...titles.count).each_slice(30) do |subset|
  threads = []

  subset.each do
    threads << Thread.new do
      title = titles.pop
      slug = title.parameterize
      if Interest.find_by(title: title) || Interest.find_by(slug: slug)
        Rails.logger.info 'skip'
      else
        interest = Interest.create!(title: title, slug: slug)
        interest.preview.attach(io: URI.parse(interest_image).open, filename: SecureRandom.hex.to_s) if with_images
        Rails.logger.info { "Interest was created #{interest.id}" }
      end

      ActiveRecord::Base.connection_pool.release_connection
    rescue StandardError => e
      Rails.logger.info("ERROR: #{e.message}")
      ActiveRecord::Base.connection_pool.release_connection
    end
  end

  threads.each(&:join)
end

ActiveRecord::Base.connection_pool.flush!
