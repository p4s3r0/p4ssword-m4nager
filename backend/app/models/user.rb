class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :validatable

  has_many :folders
  has_many :passwords
  has_many :tfas
  has_many :session_tokens, dependent: :destroy

  def invalidate_all_sessions!
    session_tokens.destroy_all
  end

  validates :theme, inclusion: { in: %w[light dark] }
end
