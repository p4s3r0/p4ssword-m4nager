class Tfa < ActiveRecord::Base
  belongs_to :user
  belongs_to :folder, optional: true

  enum :algorithm, { standard: 0, sha_256: 1 }
end
