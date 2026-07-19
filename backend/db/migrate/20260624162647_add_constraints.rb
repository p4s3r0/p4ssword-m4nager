class AddConstraints < ActiveRecord::Migration[8.1]
  def change
    change_column_null :passwords, :name, false
    change_column_null :folders, :name, false
    change_column_null :tfas, :name, false
  end
end
