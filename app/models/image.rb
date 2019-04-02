class Image < ApplicationRecord
  belongs_to :user
  serialize :tags, Array

  validates :picture, presence: true
end
