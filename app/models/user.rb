class User < ApplicationRecord
  validates :index, uniqueness: true
  validates :name, :email, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
end
