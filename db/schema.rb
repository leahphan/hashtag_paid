# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_03_29_233451) do

  create_table "images", force: :cascade do |t|
    t.integer "user_id_id"
    t.string "guid"
    t.string "picture"
    t.text "caption"
    t.integer "likes"
    t.integer "comments"
    t.string "tags"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id_id"], name: "index_images_on_user_id_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "gender"
    t.integer "age"
    t.string "email"
    t.string "phone"
    t.string "address"
    t.text "about"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
