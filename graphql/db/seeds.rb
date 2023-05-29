# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'uri'

load './db/steps/1_create_users.rb'
load './db/steps/2_create_firm.rb'
load './db/steps/3_create_interests.rb'
load './db/steps/4_create_events.rb'

Configuration.set_value('ENABLE_STRIPE_INTEGRATION', 'false')

