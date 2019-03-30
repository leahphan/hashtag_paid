class Image < ApplicationRecord
  belongs_to :user
  serialize :tags, Array
end
