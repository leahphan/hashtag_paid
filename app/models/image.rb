class Image < ApplicationRecord
  belongs_to :user
  serialize :tags, Array
  validates :user_id, presence: true
end
