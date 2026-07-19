class ChangePasswordEncUsername < ActiveRecord::Migration[8.1]
  def change
    rename_column :passwords, :username, :enc_username
    rename_column :passwords, :note, :enc_note
  end
end
