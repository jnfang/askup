# This migration comes from dce_lti (originally 20141003180140)
class CreateDceLtiUsers < ActiveRecord::Migration
  def change
    create_table :dce_lti_users do |t|
      t.string :lti_user_id, nil: false
      t.string :lis_person_contact_email_primary, size: 1.kilobyte
      t.string :lis_person_name_family, size: 1.kilobyte
      t.string :lis_person_name_full, size: 1.kilobyte
      t.string :lis_person_name_given, size: 1.kilobyte
      t.string :lis_person_sourcedid, size: 1.kilobyte
      t.string :user_image, size: 1.kilobyte
      t.string :roles, array: true, default: []

      t.string   "email",                  default: "",            null: false
      t.string   "encrypted_password",     default: "",            null: false
      t.string   "reset_password_token"
      t.datetime "reset_password_sent_at"
      t.datetime "remember_created_at"
      t.integer  "sign_in_count",          default: 0,             null: false
      t.datetime "current_sign_in_at"
      t.datetime "last_sign_in_at"
      t.string   "current_sign_in_ip"
      t.string   "last_sign_in_ip"
      t.string   "first_name"
      t.string   "last_name"
      t.string   "role",                   default: "contributor"
      t.integer  "org_id"

      t.timestamps
    end
  end
end
