# frozen_string_literal: true

module FirmManagement
  class PopulateDummyFirmJob < ApplicationJob
    DEFAULT_IMAGES = %w[
      https://s3.eu-north-1.amazonaws.com/stopoverx.production/pickapictour-sesion-de-fotos-barcelona6-e1566567507553.jpg
      https://s3.eu-north-1.amazonaws.com/stopoverx.production/145.jpg
      https://s3.eu-north-1.amazonaws.com/stopoverx.production/full-day-private-tour-in-car-and-walking-08.jpg
      https://s3.eu-north-1.amazonaws.com/stopoverx.production/97.jpg
      https://s3.eu-north-1.amazonaws.com/stopoverx.production/marseille%2B4a%2Bzuid%2Bfrankrijk%2Bmiddellandse%2Bzee%2Bstrand%2Bvakantie%2Bvilla%2Bpalais%2Blongchamp.jpg
      https://s3.eu-north-1.amazonaws.com/stopoverx.production/8b.jpg
      https://s3.eu-north-1.amazonaws.com/stopoverx.production/145+(2).jpg
      https://s3.eu-north-1.amazonaws.com/stopoverx.production/145+(1).jpg
      https://s3.eu-north-1.amazonaws.com/stopoverx.production/city-tours-through-rheinfelden.webp
    ].freeze

    USER_EMAILS = %w[
      user1@stopoverx.com
      user2@stopoverx.com
      user3@stopoverx.com
      user4@stopoverx.com
    ].freeze

    def perform(firm_id)
      firm = Firm.find(firm_id)

      return unless firm.firm_type_onboarding?

      $skip_delivery = true
      $skip_translation = true

      USER_EMAILS.each do |email|
        user = User.find_by(email: email)
        user&.destroy!
      end

      firm.payouts.destroy_all
      firm.refunds.destroy_all
      firm.payments.destroy_all
      firm.event_placements.destroy_all
      firm.tour_places.destroy_all
      firm.tour_plans.destroy_all
      firm.notifications.destroy_all
      firm.attendees.destroy_all
      firm.attendee_options.destroy_all
      firm.events.destroy_all

      firm.activate! unless firm.active?

      create_daily_events(firm, 0, images_count: 0)
      create_weekly_events(firm, 1, images_count: 3)
      create_monthly_events(firm, 2, images_count: 6)
      create_single_events(firm, 3, images_count: 9)

      create_daily_events(firm, 4, with_placements: true)
      create_weekly_events(firm, 5, with_placements: true)
      create_monthly_events(firm, 6, with_placements: true)
      create_single_events(firm, 7, with_placements: true)

      create_daily_events(firm, 8, with_options: true)
      create_weekly_events(firm, 9, with_options: true)
      create_monthly_events(firm, 10, with_options: true)
      create_single_events(firm, 11, with_options: true)

      create_daily_events(firm, 12, with_tour_plan: true)
      create_weekly_events(firm, 13, with_tour_plan: true)
      create_monthly_events(firm, 14, with_tour_plan: true)
      create_single_events(firm, 15, with_tour_plan: true)

      firm.events.each do |event|
        event.unpublish!
        event.publish!
        ScheduleEventJob.perform_now(event_id: event.id)
        Stopover::StripeIntegrator.sync(event)
        event.event_options.each do |event_option|
          Stopover::StripeIntegrator.sync(event_option)
        end
      end

      firm.events.reindex
      firm.schedules.reindex

      USER_EMAILS.each do |email|
        User.create!(email: email, status: 'active', confirmation_code: '1234')
        user.activate!(code: '1234')

        firm.schedules.where('scheduled_for > NOW()').first(4).each do |schedule|
          book_event(schedule, user.account)
        end
      end

      $skip_delivery = false
      $skip_translation = false
    rescue StandardError => e
      $skip_delivery = false
      $skip_translation = false

      raise e
    end

    def create_daily_events(firm, index, with_placements: false, with_options: false, with_tour_plan: false, images_count: 0)
      event = build_event(firm, index,
                          with_placements: with_placements,
                          with_options: with_options,
                          with_tour_plan: with_tour_plan,
                          images_count: images_count)

      event.recurring_days_with_time = %w[Monday Tuesday Wednesday Thursday Friday Saturday Sunday].map { |weekday| "#{weekday} 12:00" }

      event.save!
    end

    def create_weekly_events(firm, index, with_placements: false, with_options: false, with_tour_plan: false, images_count: 0)
      event = build_event(firm, index,
                          with_placements: with_placements,
                          with_options: with_options,
                          with_tour_plan: with_tour_plan,
                          images_count: images_count)

      event.recurring_days_with_time = %w[Monday].map { |weekday| "#{weekday} 14:00" }

      event.save!
    end

    def create_monthly_events(firm, index, with_placements: false, with_options: false, with_tour_plan: false, images_count: 0)
      event = build_event(firm, index,
                          with_placements: with_placements,
                          with_options: with_options,
                          with_tour_plan: with_tour_plan,
                          images_count: images_count)

      (0..11).to_a.each do |month|
        time = Time.zone.now.at_beginning_of_year + month.months + 2.days + 13.hours + 30.minutes
        event.single_days_with_time << time
      end

      event.save!
    end

    def create_single_events(firm, index, with_placements: false, with_options: false, with_tour_plan: false, images_count: 0)
      event = build_event(firm, index,
                          with_placements: with_placements,
                          with_options: with_options,
                          with_tour_plan: with_tour_plan,
                          images_count: images_count)

      event.single_days_with_time << (Time.zone.now.at_beginning_of_month + 1.month + 2.days + 13.hours + 30.minutes)

      event.save!
    end

    def title(index)
      [
        'Discovering Hidden Gems: Off-the-Beaten-Path Tours',
        'Immersive Cultural Expeditions: Dive Deep into Local Traditions',
        'Adventure Unleashed: Thrilling Outdoor Tours for Nature Enthusiasts',
        'Epicurean Escapes: Culinary Tours for Foodies and Gourmands',
        'Historical Journeys: Unraveling the Past with Guided Tours',
        'Sustainable Exploration: Eco-Friendly Tours for Responsible Travelers',
        'Captivating City Tours: Unveiling Urban Wonders and Landmarks',
        'Bespoke Travel Experiences: Tailored Tours for Personalized Adventures',
        'Spiritual Retreats: Tranquil Tours to Reconnect with Mind, Body, and Soul',
        'Photography Expeditions: Picture-Perfect Tours for Shutterbugs and Photographers',
        'Serbian Splendor: Exploring the Riches of the Balkans',
        'Hidden Gems of Serbia: Unveiling Treasures Beyond Belgrade',
        'Serbian Serenity: Discovering Tranquil Retreats',
        'Beyond Belgrade: A Cultural Expedition Through Serbia',
        'Serbian Tapestry: Weaving Together History and Heritage',
        'Savoring Serbia: A Culinary Odyssey Through the Balkans'
      ][index]
    end

    def description(index)
      [
        "Embark on a journey of exploration with our Discovering Hidden Gems tour series. Venture off the beaten path and uncover the best-kept secrets of each destination. Our expert guides will lead you to breathtaking landscapes, charming villages, and hidden treasures that few tourists ever see. Get ready for an unforgettable adventure as you discover the beauty of the undiscovered.<br />
Whether you're trekking through remote jungles or wandering through quaint cobblestone streets, each moment promises a new discovery and a deeper connection to the world around you. Our tours are meticulously crafted to take you beyond the tourist hotspots, allowing you to immerse yourself in authentic cultural experiences and interact with locals in meaningful ways.<br />
From remote islands to secluded mountain valleys, our Discovering Hidden Gems tours offer a diverse range of destinations to explore. Whether you're a seasoned traveler looking for new adventures or a curious explorer eager to discover hidden treasures, our tours are designed for anyone with a sense of adventure and a desire to explore off-the-beaten-path destinations.<br />
Throughout your journey, our knowledgeable guides will share fascinating insights into the history, culture, and natural beauty of each destination. You'll learn about the local customs, traditions, and way of life, gaining a deeper understanding and appreciation for the places you visit. Our goal is to provide you with enriching experiences that leave a lasting impression and inspire a sense of wonder and curiosity about the world around you.<br />
Join us on a Discovering Hidden Gems tour and embark on a journey of discovery, where every path leads to new adventures and unforgettable memories. Explore hidden waterfalls, ancient ruins, and remote villages as you uncover the hidden gems that make each destination truly special. Get ready to step off the beaten path and discover a world of wonders waiting to be explored.",
        "Immerse yourself in the richness of local cultures with our Immersive Cultural Expeditions: Dive Deep into Local Traditions. Journey beyond the surface and delve into the heart of each community, where centuries-old traditions and customs await. Our expert guides will lead you on a captivating exploration of local cultures, offering unique insights and experiences that go beyond typical tourist attractions.<br />
From participating in traditional ceremonies to learning age-old crafts from local artisans, our immersive expeditions provide an authentic glimpse into the daily lives of people around the world. Whether you're sampling exotic cuisines in bustling markets or joining in vibrant festivals, each experience is designed to deepen your understanding and appreciation of diverse cultures.<br />
Our carefully curated expeditions offer a variety of destinations and themes, ensuring there's something for every cultural enthusiast. Whether you're drawn to the mystique of ancient civilizations or the vibrancy of modern city life, our expeditions provide an unparalleled opportunity to connect with people from different backgrounds and learn from their unique perspectives.<br />
Throughout your journey, our knowledgeable guides will serve as cultural ambassadors, sharing fascinating stories and traditions passed down through generations. You'll have the chance to interact with locals in meaningful ways, forging connections that transcend language and borders.<br />
Join us on an Immersive Cultural Expedition and embark on a transformative journey of discovery and connection. Experience the beauty and diversity of the world's cultures firsthand as you dive deep into local traditions and create memories that will last a lifetime. Get ready to broaden your horizons and embark on an adventure that will leave you with a newfound appreciation for the rich tapestry of human heritage.",
        "Embark on a thrilling adventure with our Adventure Unleashed: Thrilling Outdoor Tours for Nature Enthusiasts. Dive into the heart of nature's playground and experience the adrenaline rush of outdoor exploration like never before. Our expert guides are passionate about the great outdoors and will lead you on unforgettable journeys through some of the world's most spectacular landscapes.<br />
From scaling rugged mountains to navigating winding rivers, our outdoor tours are designed to push the boundaries of adventure. Whether you're an experienced outdoorsman or a novice nature lover, there's something for everyone on our expeditions. Get ready to conquer new heights and discover hidden gems off the beaten path.<br />
Immerse yourself in the beauty of untouched wilderness as you explore remote trails, camp under the stars, and witness breathtaking vistas. Our tours take you beyond the confines of civilization, allowing you to reconnect with nature in its purest form. Whether you're hiking through dense forests or kayaking along pristine coastlines, each moment is an opportunity to embrace the wild and experience the thrill of the unknown.<br />
Throughout your journey, our knowledgeable guides will share their expertise and passion for the natural world, providing insights into local ecosystems, wildlife behavior, and conservation efforts. You'll learn to appreciate the delicate balance of nature and gain a deeper understanding of the importance of preserving our planet's precious resources.<br />
Join us on an Adventure Unleashed tour and embark on the ultimate outdoor adventure. Whether you're seeking heart-pounding excitement or tranquil moments of solitude, our tours offer an exhilarating escape from the ordinary. Get ready to unleash your sense of adventure and create memories that will last a lifetime.",
        "Indulge your senses with our Epicurean Escapes: Culinary Tours for Foodies and Gourmands. Embark on a gastronomic journey like no other as you savor the flavors of the world's most delectable cuisines. Our expertly curated tours offer a tantalizing array of culinary experiences, guaranteed to delight even the most discerning palate.<br />
From bustling street markets to Michelin-starred restaurants, our culinary tours take you on a mouthwatering adventure through the heart of each destination. Sample exotic spices, local delicacies, and traditional dishes that reflect the unique flavors and traditions of the region. Whether you're a seasoned foodie or simply love to eat, our tours offer a feast for the senses that will leave you craving more.<br />
Immerse yourself in the vibrant culinary culture of each destination as you meet local chefs, farmers, and artisans who are passionate about their craft. Learn the secrets behind traditional cooking techniques, discover new ingredients, and gain insights into the cultural significance of food in different societies. Our tours provide a unique opportunity to connect with the people and places that make each culinary experience unforgettable.<br />
Throughout your journey, our knowledgeable guides will lead you on a culinary adventure, sharing their expertise and passion for food every step of the way. Whether you're exploring bustling markets in Asia, savoring seafood along the Mediterranean coast, or indulging in decadent desserts in Europe, each experience is carefully crafted to tantalize your taste buds and awaken your sense of culinary curiosity.<br />
Join us on an Epicurean Escape and embark on a culinary journey of a lifetime. Whether you're exploring exotic street food or dining in world-renowned restaurants, our tours promise an unforgettable gastronomic experience that will satisfy your appetite for adventure and leave you craving more. Get ready to indulge your senses and discover the true pleasure of culinary exploration.",
        "Embark on a captivating voyage through time with our Historical Journeys: Unraveling the Past with Guided Tours. Delve into the annals of history as our expert guides lead you on an immersive exploration of the world's most fascinating historical sites. From ancient civilizations to modern marvels, our meticulously curated tours offer a glimpse into the rich tapestry of human history.<br />
Join us as we unravel the mysteries of the past, uncovering hidden treasures and untold stories along the way. Whether you're exploring the ruins of ancient civilizations or tracing the footsteps of historical figures, each moment is an opportunity to deepen your understanding of the world and its complex heritage.<br />
Experience the thrill of discovery as you wander through ancient temples, majestic castles, and UNESCO World Heritage sites. Our knowledgeable guides will bring history to life, sharing insights into the events, cultures, and individuals that shaped the course of history. Whether you're a history buff or simply curious about the past, our tours offer a fascinating journey through time.<br />
Throughout your journey, you'll have the chance to immerse yourself in the sights, sounds, and stories of the past. Participate in interactive experiences, engage with local historians, and gain a newfound appreciation for the significance of each historical site. Our goal is to provide you with a deeper understanding of the world and its diverse cultures, leaving you inspired and enlightened.<br />
Join us on a Historical Journey and embark on an unforgettable exploration of the past. Whether you're fascinated by ancient civilizations or intrigued by more recent history, our guided tours offer a unique opportunity to uncover the mysteries of the past and connect with the stories that continue to shape our world today. Get ready to embark on a journey through time and unravel the secrets of history with us.",
        "Embark on a journey of sustainable exploration with our Eco-Friendly Tours for Responsible Travelers under the banner of Sustainable Exploration. Dive deep into nature's wonders while treading lightly on the planet, as we guide you on an adventure that balances adventure with environmental stewardship. Our tours are crafted with a commitment to minimizing our impact on fragile ecosystems, ensuring that every step you take leaves a positive footprint.<br />
Experience the beauty of the natural world as you explore pristine wilderness areas, lush rainforests, and untouched landscapes. Our expert guides will lead you on eco-friendly excursions, sharing their passion for conservation and providing insights into the delicate balance of nature. Whether you're hiking through biodiverse forests, snorkeling in vibrant coral reefs, or kayaking along tranquil rivers, each activity is designed to foster a deeper connection with the environment.<br />
Join us in supporting local communities and sustainable practices as we engage with indigenous cultures, visit eco-friendly lodges, and participate in conservation projects. Learn about the importance of preserving biodiversity, protecting wildlife habitats, and reducing our carbon footprint. Our tours offer meaningful opportunities to make a positive impact while exploring some of the world's most spectacular natural wonders.<br />
Throughout your journey, you'll have the chance to connect with like-minded travelers who share your passion for responsible tourism and environmental conservation. Together, we'll explore innovative ways to travel sustainably, minimize waste, and support local economies. Our goal is to inspire a new generation of responsible travelers who are committed to protecting the planet for future generations.<br />
Join us on a Sustainable Exploration tour and embark on a journey of discovery, conservation, and adventure. Whether you're a nature lover, an eco-conscious traveler, or simply someone who cares about the planet, our tours offer a unique opportunity to explore the world in a way that's both enriching and sustainable. Get ready to experience the wonders of nature while making a positive impact on the planet with us.",
        "Embark on an enchanting exploration of urban landscapes with our Captivating City Tours: Unveiling Urban Wonders and Landmarks. Join us as we peel back the layers of history and culture to reveal the hidden treasures of the world's most captivating cities. Our expert guides will lead you on a journey through bustling streets, iconic landmarks, and hidden gems, offering unique insights and unforgettable experiences along the way.<br />
Discover the beating heart of each city as you immerse yourself in its vibrant culture, architecture, and cuisine. From ancient ruins to modern marvels, our tours showcase the rich tapestry of human achievement and ingenuity found in urban environments. Whether you're strolling through historic neighborhoods, exploring bustling markets, or marveling at iconic landmarks, each moment offers a new perspective on the city's unique identity and character.<br />
Experience the magic of urban exploration as you uncover the stories and secrets behind the city's most famous landmarks and attractions. Our knowledgeable guides will share fascinating anecdotes, historical insights, and insider tips that bring each destination to life. Whether you're admiring world-famous artworks in a museum, sampling street food in a local market, or climbing to the top of a towering skyscraper, our tours offer an immersive and unforgettable experience.<br />
Join us on a Captivating City Tour and embark on a journey of discovery, wonder, and adventure. Whether you're a history buff, an architecture enthusiast, or simply someone who loves to explore new places, our tours offer something for everyone. Get ready to be captivated by the beauty, diversity, and excitement of the world's most fascinating cities as you uncover their urban wonders and landmarks with us.",
        "Embark on a journey of unparalleled luxury and customization with our Bespoke Travel Experiences: Tailored Tours for Personalized Adventures. Indulge in the ultimate travel experience as we design a tour specifically crafted to suit your unique interests, preferences, and desires. Whether you dream of exploring ancient ruins, lounging on secluded beaches, or immersing yourself in local cultures, our expert travel planners will curate the perfect itinerary just for you.<br />
Experience the freedom and flexibility to travel at your own pace, with every detail meticulously arranged to ensure a seamless and unforgettable journey. From luxury accommodations to exclusive excursions, every aspect of your tour is carefully selected to exceed your expectations and create memories that will last a lifetime.<br />
Discover the world's most breathtaking destinations through the lens of your own personal interests and passions. Whether you're an adventure seeker, a culture enthusiast, or a relaxation connoisseur, our bespoke tours offer a tailored experience that caters to your every whim. From private guided tours of historic sites to gourmet dining experiences in hidden gems, every moment is designed to reflect your individual style and preferences.<br />
Join us on a Bespoke Travel Experience and embark on a journey that's as unique as you are. Whether you're celebrating a special occasion, planning a romantic getaway, or simply seeking an unforgettable adventure, our tailored tours promise an experience that's truly one-of-a-kind. Get ready to indulge in luxury, explore new horizons, and create memories that will last a lifetime with us.",
        "Embark on a transformative journey of self-discovery and inner peace with our Spiritual Retreats: Tranquil Tours to Reconnect with Mind, Body, and Soul. Escape the chaos of everyday life and immerse yourself in serene and sacred surroundings as you embark on a quest for spiritual renewal and personal growth. Our carefully curated retreats offer a sanctuary for introspection, reflection, and rejuvenation, providing a path to reconnect with your innermost being.<br />
Experience the healing power of nature as you explore tranquil landscapes, pristine wilderness areas, and sacred sites. Whether you're meditating beside a peaceful mountain stream, practicing yoga on a secluded beach, or hiking through ancient forests, each moment offers an opportunity to reconnect with the natural world and nourish your mind, body, and soul.<br />
Join us on a journey of self-discovery as we explore ancient wisdom traditions, mindfulness practices, and holistic healing modalities from around the world. Our experienced guides and facilitators will lead you through transformative workshops, meditation sessions, and spiritual ceremonies designed to awaken your inner wisdom and ignite your soul's purpose.<br />
Reconnect with your true essence and cultivate a deeper sense of inner peace, harmony, and balance as you embark on a journey of self-discovery and spiritual growth. Whether you're seeking solace, guidance, or simply a moment of quiet reflection, our spiritual retreats offer a safe and supportive environment to explore the depths of your being and connect with the essence of who you are.<br />
Join us on a Spiritual Retreat and embark on a journey of self-discovery, transformation, and enlightenment. Whether you're a seasoned spiritual seeker or just beginning your journey, our tranquil tours promise an experience that will nourish your mind, body, and soul and leave you feeling refreshed, inspired, and renewed. Get ready to reconnect with your innermost essence and embark on a journey of self-discovery and spiritual awakening with us.",
        "Embark on an unforgettable adventure with our Photography Expeditions: Picture-Perfect Tours for Shutterbugs and Photographers. Join us as we journey to some of the world's most breathtaking destinations, capturing stunning images and unforgettable moments along the way. Whether you're an amateur enthusiast or a seasoned professional, our expert guides and instructors will help you hone your skills and capture the perfect shot.<br />
Explore iconic landmarks, hidden gems, and picturesque landscapes as you immerse yourself in the art of photography. From majestic mountains to pristine beaches, our expeditions offer endless opportunities for creativity and inspiration. Whether you're capturing the vibrant colors of a sunrise or the ethereal beauty of a starry night sky, each moment is a chance to create images that will last a lifetime.<br />
Join a community of like-minded shutterbugs and photographers as you share tips, techniques, and experiences with fellow enthusiasts. Whether you're learning new skills in a photography workshop or exchanging ideas during a group critique session, our expeditions offer a supportive and collaborative environment for growth and learning.<br />
Experience the thrill of adventure as you explore off-the-beaten-path destinations and embark on exhilarating excursions. Whether you're trekking through remote wilderness areas or navigating bustling city streets, our expeditions promise an adventure of a lifetime. With expert guidance and support every step of the way, you'll have the opportunity to capture images that truly reflect the essence of your journey.<br />
Join us on a Photography Expedition and embark on a journey of discovery, creativity, and inspiration. Whether you're seeking to improve your skills, expand your portfolio, or simply capture memories that will last a lifetime, our tours offer a picture-perfect experience for shutterbugs and photographers of all levels. Get ready to explore the world through your lens and create images that tell a story with us.",
        "Embark on a captivating journey through the heart of the Balkans with our 'Serbian Splendor: Exploring the Riches of the Balkans' tour. This immersive experience offers a unique opportunity to discover the cultural heritage, natural beauty, and historical treasures of Serbia.<br />
From the vibrant streets of Belgrade to the picturesque landscapes of rural Serbia, our tour takes you on a mesmerizing odyssey through centuries of history and tradition. Explore ancient fortresses, medieval monasteries, and charming villages nestled in the scenic countryside.<br />
Indulge in the rich flavors of Serbian cuisine, from hearty traditional dishes to fine wines and spirits. Sample local specialties at family-run taverns and restaurants, and learn about the culinary traditions that have shaped Serbian culture.<br />
Immerse yourself in the vibrant arts scene of Serbia, from contemporary galleries to traditional folk performances. Discover the work of local artisans and craftsmen, and gain insight into the artistic heritage that thrives in this dynamic region.<br />
Experience the warmth and hospitality of the Serbian people as you connect with locals during cultural exchanges and immersive activities. Whether you're participating in a traditional dance workshop or sharing stories over a home-cooked meal, you'll forge lasting memories and friendships.<br />
Join us on a journey of discovery and adventure as we explore the hidden gems and timeless treasures of Serbia, a land brimming with splendor and charm. Whether you're a history buff, a nature enthusiast, or simply seeking an authentic travel experience, our tour promises an unforgettable adventure through the riches of the Balkans.",
        "Embark on an enchanting voyage of discovery with our 'Hidden Gems of Serbia: Unveiling Treasures Beyond Belgrade' tour. Delve into the lesser-known corners of this diverse and captivating country, where hidden treasures await at every turn.<br />
Escape the bustling streets of Belgrade and journey into the serene countryside, where picturesque landscapes and charming villages await. Explore hidden valleys, meandering rivers, and lush forests as you uncover the natural beauty that lies beyond the capital city.<br />
Discover the rich cultural heritage of Serbia as you visit ancient monasteries, medieval fortresses, and historic towns tucked away in the countryside. Marvel at exquisite frescoes, intricate architecture, and centuries-old traditions that have been preserved through the ages.<br />
Indulge your senses with the flavors of Serbia as you sample regional delicacies and traditional dishes prepared with locally sourced ingredients. From hearty stews and grilled meats to artisanal cheeses and sweet pastries, every meal is a celebration of the country's culinary heritage.<br />
Immerse yourself in the rhythms of rural life as you connect with locals and participate in authentic experiences. From folk music performances and artisan workshops to wine tastings and agricultural tours, you'll gain insight into the traditions and customs that define Serbian culture.<br />
Experience the warmth and hospitality of the Serbian people as you stay in charming guesthouses and family-run accommodations. Whether you're sharing stories around a bonfire, joining in a traditional dance, or simply enjoying the tranquility of the countryside, you'll feel right at home in Serbia's hidden gems.<br />
Join us on a journey of exploration and adventure as we unveil the hidden treasures of Serbia, a land of untold beauty and endless surprises. Whether you're a nature lover, a history enthusiast, or simply seeking an off-the-beaten-path experience, our tour promises to reveal the wonders that lie beyond Belgrade.",
        "Embark on an unforgettable journey with our 'Serbian Serenity: Discovering Tranquil Retreats' tour, where you'll immerse yourself in the serene beauty of Serbia's hidden havens. Nestled amidst lush forests, rolling hills, and picturesque countryside, these tranquil retreats offer a peaceful escape from the chaos of modern life. Explore secluded valleys, where the soothing sounds of nature create a sense of calm and tranquility, allowing you to unwind and recharge. Indulge in moments of relaxation as you stay in charming guesthouses, cozy cabins, or luxurious lodges, each offering unparalleled comfort and serenity. Whether you're seeking solitude, embarking on a spiritual journey, or simply longing for a break from the hustle and bustle of city life, our tour promises an unforgettable experience amidst the natural splendor of Serbia.<br />
Discover the hidden gems of Serbia as you journey through its pristine landscapes and untouched wilderness. From remote mountain retreats to secluded lakeside cabins, each location offers a unique opportunity to reconnect with nature and find inner peace. Explore hiking trails that wind through ancient forests, revealing breathtaking vistas and hidden waterfalls along the way. Experience the magic of sunrise over mist-covered mountains, or spend a tranquil evening stargazing under a canopy of twinkling stars. Whether you're seeking adventure or simply a moment of quiet reflection, our tour is designed to provide the ultimate escape into the heart of Serbian serenity.<br />
Immerse yourself in the rich cultural heritage of Serbia as you visit historic monasteries, charming villages, and traditional artisan workshops. Learn about the country's fascinating history and traditions from knowledgeable local guides, who will share their insights and stories along the way. Sample delicious homemade cuisine made with fresh, locally sourced ingredients, and discover the unique flavors and aromas of Serbian cuisine. Whether you're savoring a hearty meal by the fireplace or enjoying a picnic in the countryside, every dining experience is a celebration of Serbia's rich culinary heritage. With its welcoming hospitality and warm atmosphere, Serbia offers a truly unforgettable retreat for those seeking peace, tranquility, and a deeper connection with nature.<br />
Experience the healing power of nature as you immerse yourself in the pristine beauty of Serbia's national parks and nature reserves. From the majestic peaks of the Dinaric Alps to the tranquil waters of the Danube River, each location offers a unique opportunity to reconnect with the natural world and find inner peace. Explore hiking trails that wind through ancient forests, revealing breathtaking vistas and hidden waterfalls along the way. Spend your days kayaking on crystal-clear lakes, birdwatching in protected wetlands, or simply relaxing on a secluded beach. With its diverse landscapes and abundant wildlife, Serbia is a paradise for outdoor enthusiasts and nature lovers alike.<br />
Escape the stresses of everyday life and embark on a journey of self-discovery with our 'Serbian Serenity: Discovering Tranquil Retreats' tour. Whether you're seeking solitude, adventure, or simply a moment of quiet reflection, Serbia offers the perfect backdrop for your journey. Explore hidden valleys, pristine lakes, and ancient forests as you reconnect with nature and find inner peace. Indulge in delicious cuisine, immerse yourself in local culture, and experience the warm hospitality of the Serbian people. With its breathtaking landscapes, rich cultural heritage, and welcoming atmosphere, Serbia promises an unforgettable retreat for those seeking serenity, relaxation, and a deeper connection with the natural world.",
        "Embark on a cultural odyssey with our 'Beyond Belgrade: A Cultural Expedition Through Serbia' tour, where you'll delve into the rich tapestry of Serbia's heritage and traditions. Journey beyond the capital city and explore the hidden gems and historical landmarks that dot the country's landscape. From ancient fortresses to medieval monasteries, each stop on our itinerary offers a fascinating glimpse into Serbia's storied past and vibrant culture.<br />
Discover the diverse cultural landscape of Serbia as you visit charming villages, bustling markets, and vibrant art galleries. Meet local artisans and craftsmen who continue to preserve age-old traditions, creating intricate pottery, textiles, and woodcarvings that are a testament to the country's rich cultural heritage. Sample traditional cuisine at family-owned taverns and restaurants, where hearty stews, grilled meats, and savory pastries tantalize the taste buds and warm the soul.<br />
Immerse yourself in the rhythms of Serbian music and dance as you attend folk festivals, concerts, and performances throughout the country. From lively kolo dances to soulful gusle ballads, the sounds of Serbia's musical heritage will captivate and inspire you. Learn about the country's literary and artistic traditions as you explore museums, galleries, and cultural centers dedicated to preserving Serbia's cultural legacy.<br />
Experience the warmth and hospitality of the Serbian people as you stay in charming guesthouses, family-run farms, and historic inns. Whether you're sharing stories around a bonfire, participating in a traditional cooking class, or joining in a local celebration, you'll be welcomed with open arms and treated to genuine Serbian hospitality. With its rich cultural heritage, diverse landscapes, and warm and welcoming atmosphere, Serbia promises an unforgettable cultural expedition for those seeking to explore beyond the streets of Belgrade.<br />
Escape the beaten path and embark on a journey of discovery with our 'Beyond Belgrade: A Cultural Expedition Through Serbia' tour. Whether you're a history buff, an art enthusiast, or simply curious to learn more about Serbia's rich cultural heritage, our tour offers a unique opportunity to explore the hidden treasures and lesser-known corners of this fascinating country. Join us as we uncover the secrets of Serbia's past and celebrate the vibrant traditions that continue to thrive in the heart of the Balkans.",
        "Embark on a captivating journey through Serbia's rich tapestry of history and heritage with our 'Serbian Tapestry: Weaving Together History and Heritage' tour. Delve into the intricate threads of the country's past as you explore ancient fortresses, medieval monasteries, and archaeological sites that bear witness to centuries of civilization. From the Roman ruins of Sirmium to the Ottoman architecture of Novi Pazar, each stop on our itinerary unveils a new chapter in Serbia's storied past.<br />
Experience the vibrant cultural mosaic of Serbia as you visit bustling markets, traditional villages, and lively festivals that showcase the country's diverse heritage. Discover the art of Serbian handicrafts, from intricate embroidery to ornate ceramics, and learn about the customs and traditions that have shaped the identity of the Serbian people for generations.<br />
Immerse yourself in the artistic legacy of Serbia as you explore museums, galleries, and cultural institutions dedicated to preserving the country's artistic heritage. From the masterpieces of Serbian painters and sculptors to the rich tradition of folk art and music, Serbia's cultural landscape is as diverse as it is captivating.<br />
Savor the flavors of Serbian cuisine as you sample traditional dishes made with fresh, locally sourced ingredients. From hearty meat stews and savory pies to sweet pastries and artisanal cheeses, Serbian cuisine is a delicious reflection of the country's multicultural heritage. Indulge in culinary delights at local taverns, family-run restaurants, and farm-to-table eateries that offer a taste of authentic Serbian hospitality.<br />
Experience the warmth and hospitality of the Serbian people as you stay in charming guesthouses, historic inns, and boutique hotels that reflect the country's rich cultural heritage. Whether you're exploring ancient ruins, wandering through quaint villages, or simply relaxing amidst the stunning landscapes of Serbia, our tour promises an unforgettable journey through the threads of history and heritage that unite this remarkable country.",
        "Embark on a delectable journey through the flavors of the Balkans with our 'Savoring Serbia: A Culinary Odyssey Through the Balkans' tour. Delight your taste buds as you explore the rich culinary heritage of Serbia, where traditional recipes and local ingredients come together to create unforgettable dining experiences. From hearty stews and grilled meats to savory pastries and sweet treats, every meal is a celebration of the region's diverse gastronomic traditions.<br />
Discover the secrets of Serbian cuisine as you visit bustling markets, family-owned farms, and artisanal food producers. Sample a variety of local specialties, from freshly baked bread and homemade cheeses to cured meats and pickled vegetables, all crafted with care and pride by skilled artisans. Learn about the time-honored techniques and recipes passed down through generations, and gain insight into the cultural significance of food in Serbian society.<br />
Immerse yourself in the vibrant atmosphere of Belgrade's food scene as you explore bustling food markets, trendy cafes, and traditional restaurants. From street food stalls serving up sizzling cevapi and pljeskavica to fine dining establishments offering innovative takes on classic dishes, Belgrade is a culinary paradise waiting to be discovered.<br />
Venture beyond the capital city and explore the diverse landscapes and culinary traditions of rural Serbia. Visit local wineries and vineyards, where you can sample a selection of award-winning wines and learn about the art of winemaking from passionate vintners. Indulge in farm-to-table dining experiences, where you can enjoy freshly prepared meals made with ingredients sourced directly from the land.<br />
Experience the warmth and hospitality of the Serbian people as you dine with locals in their homes, sharing stories and recipes passed down through generations. Whether you're savoring a traditional Serbian feast, attending a cooking class with a local chef, or enjoying a leisurely picnic in the countryside, our culinary tour promises an unforgettable gastronomic journey through the heart of Serbia."
      ][index]
    end

    def build_event(firm, index, with_placements: false, with_options: false, with_tour_plan: false, images_count: 0)
      event = firm.events.build(title: "#{title(index)}#{with_placements ? ' (with places selection)' : ''} #{with_tour_plan ? ' including tour plan' : ''}",
                                description: description(index),
                                organizer_price_per_uom: Money.new(600_000),
                                max_attendees: 45,
                                duration_time: '2 hour',
                                ref_number: SecureRandom.hex(50),
                                address: firm.address,
                                language: 'en',
                                event_type: 'tour')

      event.images.attach(DEFAULT_IMAGES[0...images_count].map { |url| Stopover::FilesSupport.url_to_io(url) }) if images_count.positive?

      event.event_placements.build(title: 'Placement Schema', width_places: 6, height_places: 8) if with_placements

      event.event_options.build(title: 'Include Photo', built_in: true, organizer_price: Money.new(100_000)) if with_options

      if with_tour_plan
        tour_plan = event.tour_plans.build(title: 'Journey Blueprint: Crafting Your Perfect Tour',
                                           description: 'Unlock the essence of your dream adventure with our Journey Blueprint: Crafting Your Perfect Tour. Our meticulously designed plans ensure every detail is tailored to your desires, from exhilarating destinations to immersive experiences. Let our expert guides lead you through breathtaking landscapes, cultural wonders, and hidden gems, creating unforgettable memories along the way. With our personalized approach, embark on a seamless and enriching journey that reflects your unique interests and aspirations. Discover the world on your terms with our tailored tour plans.')

        tour_places.each do |place|
          tour_plan.tour_places.build(**place)
        end
      end

      event
    end

    def book_event(schedule, account)
      Stopover::BookingManagement::BookingCreator.new(account.user)
                                                 .perform(schedule.event,
                                                          schedule.scheduled_for,
                                                          1)
    end

    def tour_places
      [
        {
          duration_time: '3 hours',
          title: 'Belgrade Citadel Discovery',
          description: "Explore the historic Belgrade Fortress, a symbol of the city's rich history and heritage. Wander through its ancient walls, admire panoramic views of the confluence of the Sava and Danube rivers, and visit the Kalemegdan Park. Discover the fascinating past of this iconic landmark, from Roman times to the present day."
        },
        {
          duration_time: '2 hours',
          title: 'Bohemian Quarter Stroll',
          description: "Experience the bohemian charm of Skadarlija, Belgrade's historic quarter known for its cobblestone streets, colorful facades, and lively atmosphere. Immerse yourself in the vibrant arts scene, explore eclectic galleries and studios, and sample traditional Serbian cuisine at cozy taverns and restaurants."
        },
        {
          duration_time: '6 hours',
          title: 'Novi Sad Adventure',
          description: "Venture to Novi Sad, Serbia's second-largest city, situated on the banks of the Danube River. Explore the charming Old Town, visit the iconic Petrovaradin Fortress, and stroll along the picturesque riverside promenade. Discover the city's rich cultural heritage, from its Habsburg-era architecture to its vibrant music and arts scene."
        },
        {
          duration_time: '4 hours',
          title: 'Ethno Village Retreat',
          description: "Escape to Drvengrad, also known as Kustendorf, a unique ethno village nestled in the scenic mountains of Western Serbia. Immerse yourself in the rustic charm of wooden cottages, cobbled streets, and traditional craftsmanship. Explore the village's cultural attractions, including art galleries, museums, and film festivals."
        },
        {
          duration_time: '8 hours',
          title: 'Historic Niš Expedition',
          description: "Journey to Niš, one of Serbia's oldest cities, steeped in history and legend. Explore its ancient fortresses, Ottoman-era monuments, and Roman ruins, including the iconic Niš Fortress and Ćele Kula (Skull Tower). Dive into the city's rich cultural heritage, from its vibrant markets to its traditional cuisine and folklore."
        },
        {
          duration_time: '5 hours',
          title: 'Natural Wonders Excursion',
          description: "Discover the otherworldly landscapes of Đavolja Varoš, a unique rock formation in southern Serbia known as Devil's Town. Marvel at the towering earth pyramids, shaped by centuries of erosion, and explore the surrounding natural wonders, including hot springs, caves, and waterfalls. Experience the mystical allure of this UNESCO-listed site."
        },
        {
          duration_time: '3 hours',
          title: 'Film Festival Experience',
          description: "Immerse yourself in the world of cinema at Drvengrad, home to the annual Küstendorf Film and Music Festival. Explore the village's eclectic mix of film sets, art installations, and cultural events, and mingle with filmmakers, actors, and artists from around the world. Experience the magic of cinema in this unique and picturesque setting."
        },
        {
          duration_time: '8 hours',
          title: 'Nature Retreat',
          description: 'Escape to Tara National Park, a pristine wilderness area in western Serbia known for its rugged mountains, dense forests, and meandering rivers. Explore scenic hiking trails, discover hidden waterfalls, and encounter diverse wildlife, including brown bears, wolves, and eagles. Immerse yourself in the tranquility of nature in this UNESCO Biosphere Reserve.'
        },
        {
          duration_time: '4 hours',
          title: 'Wine Tasting Tour',
          description: "Indulge in a wine tasting adventure in Sremski Karlovci, a charming town in the heart of Serbia's wine country. Visit local vineyards, sample a variety of wines, and learn about the region's winemaking traditions from expert vintners. Discover the unique flavors and aromas of Serbian wines in this idyllic wine-growing region."
        },
        {
          duration_time: '6 hours',
          title: 'Lake Retreat',
          description: 'Relax and unwind at Palić Lake, a tranquil oasis in northern Serbia known for its scenic beauty and therapeutic waters. Enjoy leisurely strolls along the promenade, rent a paddleboat or kayak, and take a refreshing dip in the crystal-clear lake. Discover the charming architecture, lush parks, and cultural attractions that surround this idyllic destination.'
        },
        {
          duration_time: '4 hours',
          title: 'Roman Ruins Exploration',
          description: "Step back in time at Gamzigrad, an ancient Roman complex and UNESCO World Heritage Site in eastern Serbia. Explore the impressive ruins of Emperor Galerius' palace, bathhouses, and temples, and marvel at the intricate mosaics and sculptures that adorn the site. Discover the legacy of the Roman Empire in this well-preserved archaeological treasure."
        },
        {
          duration_time: '8 hours',
          title: 'Mountain Escape',
          description: 'Escape to the picturesque Zlatibor Mountain, a popular resort destination in western Serbia known for its pristine nature and mountainous landscapes. Explore scenic hiking trails, breathe in the fresh mountain air, and marvel at panoramic views of the surrounding valleys and peaks. Discover charming villages, traditional cuisine, and warm hospitality in this alpine paradise.'
        },
        {
          duration_time: '6 hours',
          title: 'Art Nouveau Exploration',
          description: 'Discover the architectural gems of Subotica, a vibrant city in northern Serbia known for its stunning Art Nouveau buildings. Explore the city center and admire the intricate facades, ornate decorations, and colorful mosaics that adorn its historic landmarks. Learn about the history and cultural significance of this unique architectural style in Serbia.'
        },
        {
          duration_time: '3 hours',
          title: 'Cultural Festival Experience',
          description: "Immerse yourself in the vibrant cultural scene of Drvengrad, home to a variety of festivals and events throughout the year. Experience traditional music performances, art exhibitions, and cultural workshops celebrating Serbia's rich heritage and artistic traditions. Engage with local artists, artisans, and performers in this dynamic and creative community."
        },
        {
          duration_time: '4 hours',
          title: 'Wine Route Tour',
          description: "Embark on a wine tasting journey along the Vršac Wine Route, one of Serbia's oldest and most renowned wine regions. Visit family-owned wineries, sample a selection of award-winning wines, and learn about the winemaking process from knowledgeable vintners. Discover the unique terroir and grape varieties that make Serbian wines truly distinctive."
        }
      ]
    end
  end
end
