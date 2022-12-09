# frozen_string_literal: true

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

ActiveRecord::Schema[7.0].define(version: 2022_12_07_174903) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  # Custom types defined in this database.
  # Note that some types may not work with other database engines. Be careful if changing database.
  create_enum "reading_list_status", ["unread", "finished"]

  create_table "books", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string("title")
    t.text("description")
    t.datetime("created_at", null: false)
    t.datetime("updated_at", null: false)
    t.index(["title"], name: "index_books_on_title")
  end

  create_table "reading_lists", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid("user_id")
    t.uuid("book_id")
    t.datetime("created_at", null: false)
    t.datetime("updated_at", null: false)
    t.enum("status", enum_type: "reading_list_status")
    t.index(["book_id"], name: "index_reading_lists_on_book_id")
    t.index(["status"], name: "index_reading_lists_on_status")
    t.index(["user_id", "book_id"], name: "index_reading_lists_on_user_id_and_book_id", unique: true)
    t.index(["user_id"], name: "index_reading_lists_on_user_id")
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string("username")
    t.string("password_digest")
    t.datetime("created_at", null: false)
    t.datetime("updated_at", null: false)
    t.index(["username"], name: "index_users_on_username", unique: true)
  end

  add_foreign_key "reading_lists", "books"
  add_foreign_key "reading_lists", "users"
end
