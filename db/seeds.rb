require 'json'

# Load Users
user_file = File.read(File.join(File.dirname(__FILE__), 'users.json'))
parsed_users = JSON.parse(user_file)

parsed_users.each do |user, |
  User.create(
    id: user["index"],
    name: user["name"],
    gender: user["gender"],
    age: user["age"],
    email: user["email"],
    phone: user["phone"],
    address: user["address"],
    about: user["about"]
  )
end

# Load Images
image_file = File.read(File.join(File.dirname(__FILE__), 'images.json'))
parsed_images = JSON.parse(image_file)

parsed_images.each do |image, |
  saved_image = Image.create(
    id: image["id"],
    guid: image["guid"],
    picture: image["picture"],
    caption: image["caption"],
    likes: image["likes"],
    comments: image["comments"],
    user_id: image["userId"],
    tags: image["tags"]
  )
  puts saved_image.errors.messages if saved_image.errors.count > 0
end
