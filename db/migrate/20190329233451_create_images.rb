class CreateImages < ActiveRecord::Migration[5.2]
  def change
    create_table :images do |t|
      t.references :user_id, foreign_key: true
      t.string :guid
      t.string :picture
      t.text :caption
      t.integer :likes
      t.integer :comments
      t.string :tags

      t.timestamps
    end
  end
end
