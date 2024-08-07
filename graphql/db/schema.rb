# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_03_11_221658) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "account_firms", force: :cascade do |t|
    t.bigint "account_id"
    t.bigint "firm_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_account_firms_on_account_id"
    t.index ["firm_id"], name: "index_account_firms_on_firm_id"
  end

  create_table "account_interests", force: :cascade do |t|
    t.bigint "account_id"
    t.bigint "interest_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id", "interest_id"], name: "index_account_interests_on_account_id_and_interest_id", unique: true
    t.index ["account_id"], name: "index_account_interests_on_account_id"
    t.index ["interest_id"], name: "index_account_interests_on_interest_id"
  end

  create_table "accounts", force: :cascade do |t|
    t.string "name"
    t.string "status", default: "initial", null: false
    t.string "phones", default: [], array: true
    t.string "primary_phone"
    t.bigint "user_id"
    t.datetime "verified_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "date_of_birth"
    t.string "primary_email"
    t.string "language", default: "en", null: false
    t.bigint "firm_id"
    t.bigint "address_id"
    t.index ["address_id"], name: "index_accounts_on_address_id"
    t.index ["firm_id"], name: "index_accounts_on_firm_id"
    t.index ["user_id"], name: "index_accounts_on_user_id", unique: true
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "addresses", force: :cascade do |t|
    t.text "full_address"
    t.string "country"
    t.string "region"
    t.string "city"
    t.string "street"
    t.string "house_number"
    t.string "postal_code"
    t.float "latitude"
    t.float "longitude"
    t.bigint "firm_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["firm_id"], name: "index_addresses_on_firm_id"
  end

  create_table "article_interests", force: :cascade do |t|
    t.bigint "article_id"
    t.bigint "interest_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["article_id", "interest_id"], name: "index_article_interests_on_article_id_and_interest_id", unique: true
    t.index ["article_id"], name: "index_article_interests_on_article_id"
    t.index ["interest_id"], name: "index_article_interests_on_interest_id"
  end

  create_table "articles", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.datetime "published_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "language", default: "en"
    t.bigint "seo_metadatum_id"
    t.index ["seo_metadatum_id"], name: "index_articles_on_seo_metadatum_id"
  end

  create_table "attendee_options", force: :cascade do |t|
    t.bigint "attendee_id"
    t.bigint "event_option_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "attendee_price_cents", default: "0.0"
    t.decimal "organizer_price_cents", default: "0.0"
    t.string "status", default: "available"
    t.bigint "stripe_integration_id"
    t.bigint "firm_id"
    t.bigint "event_id"
    t.bigint "schedule_id"
    t.bigint "booking_id"
    t.index ["attendee_id"], name: "index_attendee_options_on_attendee_id"
    t.index ["booking_id"], name: "index_attendee_options_on_booking_id"
    t.index ["event_id"], name: "index_attendee_options_on_event_id"
    t.index ["event_option_id"], name: "index_attendee_options_on_event_option_id"
    t.index ["firm_id"], name: "index_attendee_options_on_firm_id"
    t.index ["schedule_id"], name: "index_attendee_options_on_schedule_id"
    t.index ["stripe_integration_id"], name: "index_attendee_options_on_stripe_integration_id"
  end

  create_table "attendees", force: :cascade do |t|
    t.bigint "booking_id"
    t.string "first_name"
    t.string "last_name"
    t.string "phone"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "status", default: "not_registered"
    t.bigint "firm_id"
    t.bigint "event_id"
    t.bigint "schedule_id"
    t.bigint "event_placement_id"
    t.integer "place", default: [], array: true
    t.index ["booking_id"], name: "index_attendees_on_booking_id"
    t.index ["event_id"], name: "index_attendees_on_event_id"
    t.index ["event_placement_id"], name: "index_attendees_on_event_placement_id"
    t.index ["firm_id"], name: "index_attendees_on_firm_id"
    t.index ["schedule_id"], name: "index_attendees_on_schedule_id"
  end

  create_table "balances", force: :cascade do |t|
    t.bigint "firm_id"
    t.decimal "total_amount_cents", default: "0.0"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "last_payout_at", precision: nil
    t.index ["firm_id"], name: "index_balances_on_firm_id"
  end

  create_table "booking_cancellation_options", force: :cascade do |t|
    t.decimal "penalty_price_cents"
    t.text "description", default: ""
    t.string "status"
    t.bigint "event_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "deadline", null: false
    t.index ["event_id"], name: "index_booking_cancellation_options_on_event_id"
  end

  create_table "booking_options", force: :cascade do |t|
    t.bigint "booking_id"
    t.bigint "event_option_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "attendee_price_cents", default: "0.0"
    t.decimal "organizer_price_cents", default: "0.0"
    t.string "status", default: "available"
    t.bigint "stripe_integration_id"
    t.index ["booking_id"], name: "index_booking_options_on_booking_id"
    t.index ["event_option_id"], name: "index_booking_options_on_event_option_id"
    t.index ["stripe_integration_id"], name: "index_booking_options_on_stripe_integration_id"
  end

  create_table "bookings", force: :cascade do |t|
    t.string "status"
    t.bigint "event_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "trip_id"
    t.bigint "schedule_id"
    t.bigint "stripe_integration_id"
    t.string "payment_type"
    t.decimal "organizer_price_per_uom_cents", default: "0.0"
    t.decimal "attendee_price_per_uom_cents", default: "0.0"
    t.index ["event_id"], name: "index_bookings_on_event_id"
    t.index ["schedule_id"], name: "index_bookings_on_schedule_id"
    t.index ["stripe_integration_id"], name: "index_bookings_on_stripe_integration_id"
    t.index ["trip_id"], name: "index_bookings_on_trip_id"
  end

  create_table "dynamic_translations", force: :cascade do |t|
    t.string "source", null: false
    t.string "source_field", null: false
    t.string "target_language", null: false
    t.string "translatable_type"
    t.bigint "translatable_id"
    t.string "translation", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["translatable_type", "translatable_id"], name: "index_dynamic_translations_on_translatable"
  end

  create_table "event_interests", force: :cascade do |t|
    t.bigint "event_id"
    t.bigint "interest_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id", "interest_id"], name: "index_event_interests_on_event_id_and_interest_id", unique: true
    t.index ["event_id"], name: "index_event_interests_on_event_id"
    t.index ["interest_id"], name: "index_event_interests_on_interest_id"
  end

  create_table "event_options", force: :cascade do |t|
    t.string "title"
    t.decimal "organizer_price_cents", default: "0.0"
    t.decimal "attendee_price_cents", default: "0.0"
    t.boolean "built_in", default: false
    t.bigint "event_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
    t.boolean "for_attendee", default: false
    t.string "status", default: "available"
    t.string "language", default: "en"
    t.index ["event_id"], name: "index_event_options_on_event_id"
  end

  create_table "event_placements", force: :cascade do |t|
    t.bigint "firm_id"
    t.bigint "event_id"
    t.string "title"
    t.integer "width_places", default: 0
    t.integer "height_places", default: 0
    t.jsonb "places", default: {}
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_event_placements_on_event_id"
    t.index ["firm_id"], name: "index_event_placements_on_firm_id"
  end

  create_table "events", force: :cascade do |t|
    t.string "title", null: false
    t.text "description", null: false
    t.string "event_type", null: false
    t.decimal "organizer_price_per_uom_cents", default: "0.0"
    t.decimal "attendee_price_per_uom_cents", default: "0.0"
    t.boolean "requires_contract", default: false, null: false
    t.boolean "requires_passport", default: false, null: false
    t.boolean "requires_check_in", default: false, null: false
    t.string "recurring_days_with_time", default: [], array: true
    t.string "duration_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "status"
    t.datetime "single_days_with_time", precision: nil, default: [], array: true
    t.string "ref_number"
    t.string "landmark"
    t.decimal "deposit_amount_cents", default: "0.0", null: false
    t.boolean "requires_deposit", default: false, null: false
    t.integer "max_attendees"
    t.integer "min_attendees", default: 0
    t.bigint "firm_id"
    t.datetime "end_date"
    t.string "language", default: "en"
    t.bigint "address_id"
    t.boolean "featured", default: false
    t.bigint "seo_metadatum_id"
    t.index ["address_id"], name: "index_events_on_address_id"
    t.index ["event_type"], name: "index_events_on_event_type"
    t.index ["firm_id"], name: "index_events_on_firm_id"
    t.index ["ref_number", "firm_id"], name: "index_events_on_ref_number_and_firm_id", unique: true
    t.index ["seo_metadatum_id"], name: "index_events_on_seo_metadatum_id"
  end

  create_table "firms", force: :cascade do |t|
    t.string "title", null: false
    t.text "description"
    t.string "contact_person"
    t.string "primary_email"
    t.string "primary_phone"
    t.string "website"
    t.text "contacts"
    t.string "status", default: "pending"
    t.string "stripe_account_id"
    t.string "business_type", default: "individual", null: false
    t.string "postal_code"
    t.string "ref_number"
    t.string "payment_types", default: [], null: false, array: true
    t.integer "margin", default: 0
    t.string "contract_address"
    t.bigint "address_id"
    t.string "available_payment_methods", default: [], null: false, array: true
    t.string "language", default: "en"
    t.string "firm_type", default: "onboarding"
    t.bigint "seo_metadatum_id"
    t.index ["address_id"], name: "index_firms_on_address_id"
    t.index ["ref_number"], name: "index_firms_on_ref_number", unique: true
    t.index ["seo_metadatum_id"], name: "index_firms_on_seo_metadatum_id"
  end

  create_table "flipper_features", force: :cascade do |t|
    t.string "key", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["key"], name: "index_flipper_features_on_key", unique: true
  end

  create_table "flipper_gates", force: :cascade do |t|
    t.string "feature_key", null: false
    t.string "key", null: false
    t.string "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["feature_key", "key", "value"], name: "index_flipper_gates_on_feature_key_and_key_and_value", unique: true
  end

  create_table "interests", force: :cascade do |t|
    t.string "title", null: false
    t.string "slug", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "language", default: "en"
    t.text "description", default: ""
    t.bigint "seo_metadatum_id"
    t.index ["seo_metadatum_id"], name: "index_interests_on_seo_metadatum_id"
    t.index ["slug"], name: "index_interests_on_slug", unique: true
    t.index ["title"], name: "index_interests_on_title", unique: true
  end

  create_table "log_events", force: :cascade do |t|
    t.string "event_type", default: "common", null: false
    t.string "level", default: "info", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "action"
    t.string "notification_type"
    t.jsonb "content"
  end

  create_table "notifications", force: :cascade do |t|
    t.string "delivery_method", null: false
    t.string "from"
    t.string "to", null: false
    t.string "subject"
    t.string "content", null: false
    t.datetime "sent_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "notification_type", default: "system"
    t.bigint "firm_id"
    t.bigint "booking_id"
    t.index ["booking_id"], name: "index_notifications_on_booking_id"
    t.index ["firm_id"], name: "index_notifications_on_firm_id"
  end

  create_table "payment_connections", force: :cascade do |t|
    t.bigint "stripe_integration_id"
    t.bigint "payment_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["payment_id"], name: "index_payment_connections_on_payment_id"
    t.index ["stripe_integration_id"], name: "index_payment_connections_on_stripe_integration_id"
  end

  create_table "payments", force: :cascade do |t|
    t.string "status"
    t.decimal "total_price_cents", default: "0.0"
    t.bigint "balance_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "booking_id"
    t.string "stripe_checkout_session_id"
    t.string "provider"
    t.string "payment_type"
    t.string "payment_intent_id"
    t.bigint "firm_id"
    t.index ["balance_id"], name: "index_payments_on_balance_id"
    t.index ["booking_id"], name: "index_payments_on_booking_id"
    t.index ["firm_id"], name: "index_payments_on_firm_id"
  end

  create_table "payouts", force: :cascade do |t|
    t.bigint "firm_id"
    t.bigint "balance_id"
    t.decimal "total_amount_cents"
    t.string "status"
    t.datetime "completed_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "stripe_transfer_id"
    t.datetime "sent_at", precision: nil
    t.index ["balance_id"], name: "index_payouts_on_balance_id"
    t.index ["firm_id"], name: "index_payouts_on_firm_id"
  end

  create_table "ratings", force: :cascade do |t|
    t.integer "rating_value"
    t.bigint "event_id"
    t.bigint "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_ratings_on_account_id"
    t.index ["event_id"], name: "index_ratings_on_event_id"
  end

  create_table "refunds", force: :cascade do |t|
    t.bigint "booking_cancellation_option_id"
    t.bigint "payment_id"
    t.bigint "booking_id"
    t.bigint "account_id"
    t.bigint "firm_id"
    t.string "status", default: "pending", null: false
    t.decimal "refund_amount_cents", default: "0.0", null: false
    t.decimal "penalty_amount_cents", default: "0.0", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "refund_id"
    t.string "stripe_refund_id"
    t.bigint "balance_id"
    t.index ["account_id"], name: "index_refunds_on_account_id"
    t.index ["balance_id"], name: "index_refunds_on_balance_id"
    t.index ["booking_cancellation_option_id"], name: "index_refunds_on_booking_cancellation_option_id"
    t.index ["booking_id"], name: "index_refunds_on_booking_id"
    t.index ["firm_id"], name: "index_refunds_on_firm_id"
    t.index ["payment_id"], name: "index_refunds_on_payment_id"
    t.index ["refund_id"], name: "index_refunds_on_refund_id"
  end

  create_table "schedules", force: :cascade do |t|
    t.string "status", default: "active", null: false
    t.datetime "scheduled_for", precision: nil, null: false
    t.bigint "event_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_schedules_on_event_id"
  end

  create_table "seo_metadata", force: :cascade do |t|
    t.string "title", default: ""
    t.string "description", default: ""
    t.string "keywords", default: ""
    t.string "language", default: "en"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stripe_connects", force: :cascade do |t|
    t.bigint "firm_id", null: false
    t.string "status", default: "pending", null: false
    t.string "stripe_connect_id"
    t.datetime "activated_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["firm_id"], name: "index_stripe_connects_on_firm_id"
  end

  create_table "stripe_integrations", force: :cascade do |t|
    t.string "price_id"
    t.string "product_id"
    t.bigint "stripeable_id"
    t.string "stripeable_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "status"
    t.integer "version", default: 1
    t.index ["stripeable_id", "stripeable_type"], name: "index_stripe_integrations_on_stripeable_id_and_stripeable_type"
  end

  create_table "tour_places", force: :cascade do |t|
    t.bigint "firm_id"
    t.bigint "event_id"
    t.bigint "tour_plan_id"
    t.string "title"
    t.string "duration_time"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_tour_places_on_event_id"
    t.index ["firm_id"], name: "index_tour_places_on_firm_id"
    t.index ["tour_plan_id"], name: "index_tour_places_on_tour_plan_id"
  end

  create_table "tour_plans", force: :cascade do |t|
    t.bigint "firm_id"
    t.bigint "event_id"
    t.string "title"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_tour_plans_on_event_id"
    t.index ["firm_id"], name: "index_tour_plans_on_firm_id"
  end

  create_table "trips", force: :cascade do |t|
    t.bigint "account_id"
    t.date "start_date"
    t.date "end_date"
    t.string "status", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_trips_on_account_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "phone"
    t.string "confirmation_code"
    t.string "status", null: false
    t.datetime "disabled_at"
    t.datetime "confirmed_at"
    t.datetime "last_try"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "session_password"
    t.boolean "service_user", default: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["phone"], name: "index_users_on_phone", unique: true
  end

  add_foreign_key "account_firms", "accounts"
  add_foreign_key "account_firms", "firms"
  add_foreign_key "account_interests", "accounts"
  add_foreign_key "account_interests", "interests"
  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "attendee_options", "stripe_integrations"
  add_foreign_key "booking_options", "bookings"
  add_foreign_key "booking_options", "event_options"
  add_foreign_key "booking_options", "stripe_integrations"
  add_foreign_key "bookings", "schedules"
  add_foreign_key "bookings", "stripe_integrations"
  add_foreign_key "event_interests", "events"
  add_foreign_key "event_interests", "interests"
  add_foreign_key "events", "firms"
  add_foreign_key "schedules", "events"
end
