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

ActiveRecord::Schema[7.0].define(version: 2022_09_14_120453) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

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
    t.string "house_number"
    t.string "street"
    t.string "city"
    t.string "country"
    t.string "region"
    t.string "full_address"
    t.float "longitude"
    t.float "latitude"
    t.string "status", default: "initial", null: false
    t.string "phones", default: [], array: true
    t.string "primary_phone"
    t.bigint "user_id"
    t.datetime "verified_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_accounts_on_user_id", unique: true
  end

  create_table "achievements", force: :cascade do |t|
    t.string "title", null: false
    t.string "preview"
    t.boolean "active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["title"], name: "index_achievements_on_title", unique: true
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

  create_table "booking_event_options", force: :cascade do |t|
    t.bigint "booking_id"
    t.bigint "event_option_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["booking_id"], name: "index_booking_event_options_on_booking_id"
    t.index ["event_option_id"], name: "index_booking_event_options_on_event_option_id"
  end

  create_table "bookings", force: :cascade do |t|
    t.string "name"
    t.string "status"
    t.string "phone"
    t.string "email"
    t.datetime "booked_for", null: false
    t.bigint "event_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "trip_id"
    t.index ["event_id"], name: "index_bookings_on_event_id"
    t.index ["trip_id"], name: "index_bookings_on_trip_id"
  end

  create_table "configurations", force: :cascade do |t|
    t.string "value"
    t.string "key"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["key"], name: "index_configurations_on_key"
  end

  create_table "event_achievements", force: :cascade do |t|
    t.bigint "event_id"
    t.bigint "achievement_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["achievement_id"], name: "index_event_achievements_on_achievement_id"
    t.index ["event_id"], name: "index_event_achievements_on_event_id"
  end

  create_table "event_interests", force: :cascade do |t|
    t.bigint "event_id"
    t.bigint "interest_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_event_interests_on_event_id"
    t.index ["interest_id"], name: "index_event_interests_on_interest_id"
  end

  create_table "event_options", force: :cascade do |t|
    t.string "title"
    t.decimal "organizer_cost_cents"
    t.decimal "attendee_cost_cents"
    t.boolean "built_in", default: false
    t.bigint "event_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
    t.index ["event_id"], name: "index_event_options_on_event_id"
  end

  create_table "event_tags", force: :cascade do |t|
    t.bigint "tag_id"
    t.bigint "event_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_event_tags_on_event_id"
    t.index ["tag_id"], name: "index_event_tags_on_tag_id"
  end

  create_table "events", force: :cascade do |t|
    t.string "title", null: false
    t.text "description", null: false
    t.string "event_type", null: false
    t.string "recurring_type", null: false
    t.decimal "organizer_cost_per_uom_cents"
    t.decimal "attendee_cost_per_uom_cents"
    t.boolean "requires_contract", default: false, null: false
    t.boolean "requires_passport", default: false, null: false
    t.boolean "requires_check_in", default: false, null: false
    t.string "recurring_days_with_time", default: [], array: true
    t.string "duration_time"
    t.string "house_number"
    t.string "street"
    t.string "city"
    t.string "country"
    t.string "region"
    t.string "full_address"
    t.float "longitude"
    t.float "latitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "unit_id"
    t.string "status"
    t.datetime "single_days_with_time", precision: nil, default: [], array: true
    t.index ["event_type"], name: "index_events_on_event_type"
    t.index ["unit_id"], name: "index_events_on_unit_id"
  end

  create_table "interests", force: :cascade do |t|
    t.string "title", null: false
    t.string "slug", null: false
    t.string "preview"
    t.boolean "active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_interests_on_slug", unique: true
    t.index ["title"], name: "index_interests_on_title", unique: true
  end

  create_table "tags", force: :cascade do |t|
    t.string "title", null: false
    t.string "preview"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "trips", force: :cascade do |t|
    t.bigint "account_id"
    t.date "start_date"
    t.date "end_date"
    t.string "city"
    t.string "country"
    t.string "region"
    t.string "full_address"
    t.float "longitude"
    t.float "latitude"
    t.string "status", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_trips_on_account_id"
  end

  create_table "units", force: :cascade do |t|
    t.string "name", null: false
    t.string "unit_type", default: "common", null: false
    t.string "preview"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["phone"], name: "index_users_on_phone", unique: true
  end

end
