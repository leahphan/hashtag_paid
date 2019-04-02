FactoryBot.define do
  factory :user do
    name { "John" }
    email  { "example@gmail.com" }
  end

  factory :image do
    association :user
    picture { "https://photo.com" }
  end
end