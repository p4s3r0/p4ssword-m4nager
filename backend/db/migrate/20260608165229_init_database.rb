class InitDatabase < ActiveRecord::Migration[8.1]
  def change
    create_table :folders do |t|
      t.string :name
      t.boolean :starred
      t.references :user, null: false, foreign_key: true
      t.string :color, default: nil
      t.timestamps
    end

    create_table :passwords do |t|
      t.string :name
      t.boolean :starred, default: false
      t.string :enc_password, default: nil
      t.string :note, default: nil
      t.references :folder, null: true, foreign_key: true, default: nil
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end

    create_table :tfas do |t|
      t.string :name
      t.string :enc_secret
      t.integer :algorithm, default: 0
      t.references :user, null: false, foreign_key: true
    end
  end
end
