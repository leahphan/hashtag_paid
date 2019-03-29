
require 'json'

# Load Users
user_file = File.read(File.join(File.dirname(__FILE__), 'users.json'))
parsed_users = JSON.parse(user_file)

parsed_users.each do |user, |
  User.create(
    index: user["index"],
    name: user["name"],
    gender: user["gender"],
    age: user["age"],
    email: user["email"],
    phone: user["phone"],
    address: user["address"],
    about: user["about"]
  )
end

