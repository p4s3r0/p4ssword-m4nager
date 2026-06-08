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

ActiveRecord::Schema[8.1].define(version: 2026_06_08_165229) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "folders", force: :cascade do |t|
    t.string "color"
    t.datetime "created_at", null: false
    t.string "name"
    t.boolean "starred"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_folders_on_user_id"
  end

  create_table "passwords", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "enc_password"
    t.bigint "folder_id"
    t.string "name"
    t.string "note"
    t.boolean "starred", default: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["folder_id"], name: "index_passwords_on_folder_id"
    t.index ["user_id"], name: "index_passwords_on_user_id"
  end

  create_table "two_fa", force: :cascade do |t|
    t.integer "algorithm", default: 0
    t.string "enc_secret"
    t.string "name"
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_two_fa_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.datetime "updated_at", null: false
    t.string "username", default: "", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "folders", "users"
  add_foreign_key "passwords", "folders"
  add_foreign_key "passwords", "users"
  add_foreign_key "two_fa", "users"
end
