class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :validatable

  has_many :folders
  has_many :passwords
  has_many :two_fa
end
