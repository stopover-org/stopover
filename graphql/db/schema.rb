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

ActiveRecord::Schema.define(version: 2022_02_05_134536) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "account_interests", force: :cascade do |t|
    t.bigint "account_id"
    t.bigint "interest_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
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
    t.datetime "verified_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_accounts_on_user_id", unique: true
  end

  create_table "configurations", force: :cascade do |t|
    t.string "value"
    t.string "key"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["key"], name: "index_configurations_on_key"
  end

  create_table "interests", force: :cascade do |t|
    t.string "title", null: false
    t.string "slug", null: false
    t.string "preview"
    t.boolean "active", default: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["slug"], name: "index_interests_on_slug", unique: true
    t.index ["title"], name: "index_interests_on_title", unique: true
  end

  create_table "trips", force: :cascade do |t|
    t.string "title", null: false
    t.text "description", null: false
    t.string "trip_type", null: false
    t.string "recurring_type", null: false
    t.decimal "organizer_cost_per_uom"
    t.decimal "attendee_cost_per_uom"
    t.boolean "requires_contract", default: false, null: false
    t.boolean "requires_passport", default: false, null: false
    t.string "recurring_days_with_time", default: [], array: true
    t.string "single_days_with_time", default: [], array: true
    t.string "duration_time"
    t.string "house_number"
    t.string "street"
    t.string "city"
    t.string "country"
    t.string "region"
    t.string "full_address"
    t.float "longitude"
    t.float "latitude"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["trip_type"], name: "index_trips_on_trip_type"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "phone"
    t.string "confirmation_code"
    t.string "status", null: false
    t.datetime "disabled_at", precision: 6
    t.datetime "confirmed_at", precision: 6
    t.datetime "last_try", precision: 6
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "session_password"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["phone"], name: "index_users_on_phone", unique: true
  end

  add_foreign_key "account_interests", "accounts"
  add_foreign_key "account_interests", "interests"
end
