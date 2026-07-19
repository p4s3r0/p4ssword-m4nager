class RemoveSessionTokenFromUser < ActiveRecord::Migration[8.1]
  def change
    remove_column :users, :session_token, :string
  end
end
