class AddLtiToDevise < ActiveRecord::Migration
  def change
    add_column :users, "lti_user_id", :string
    add_column :users, "lis_person_contact_email_primary", :string
    add_column :users, "lis_person_name_family", :string
    add_column :users, "lis_person_name_full", :string
    add_column :users, "lis_person_name_given", :string
    add_column :users, "lis_person_sourcedid", :string
    add_column :users, "user_image", :string
    add_column :users, "roles", :string, default: "--- []\n"
  end
end
