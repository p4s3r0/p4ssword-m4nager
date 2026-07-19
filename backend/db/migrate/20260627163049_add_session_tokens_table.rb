class AddSessionTokensTable < ActiveRecord::Migration[8.1]
  def change
    create_table :session_tokens do |t|
      t.string :token
      t.references :user, null: false, foreign_key: true
      t.datetime :last_refresh

      t.timestamps
    end

    add_index :session_tokens, :token, unique: true
  end
end
