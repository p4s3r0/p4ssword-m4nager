class Folder < ActiveRecord::Base
  belongs_to :user
  has_many :passwords, dependent: :destroy

  # validates :color, format: { with: /\A#(?:[0-9a-fA-F]{3}){1,2}\z/, message: "must be a valid hex color code" }, allow_blank: true
  # TODO: add
end
