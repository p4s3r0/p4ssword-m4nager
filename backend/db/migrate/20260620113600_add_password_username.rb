class AddPasswordUsername < ActiveRecord::Migration[8.1]
  def change
    add_column :passwords, :username, :string
  end
end
