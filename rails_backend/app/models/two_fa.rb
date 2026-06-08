class TwoFa < ActiveRecord::Base
  belongs_to :user
  belongs_to :folder, optional: true

  enum algorithm: { STANDARD: 0, SHA_256: 1 }
end
