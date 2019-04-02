require "rails_helper"

RSpec.describe Image, :type => :model do

  before(:all) do
    @image = create(:image)
  end

  it "is valid with valid attributes" do
    expect(@image).to be_valid
  end

  it "is not valid without a picture" do
    image_without_pic = build(:image, picture: nil)
    expect(image_without_pic).to_not be_valid
  end
end