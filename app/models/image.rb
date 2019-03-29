class Image < ApplicationRecord
  belongs_to :user_id
  serialize :tags, Array
  validates :user_id, presence: true
end
