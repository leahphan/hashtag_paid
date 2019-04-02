require "rails_helper"

RSpec.describe User, :type => :model do

  before(:all) do
    @user = create(:user)
  end

  it "is valid with valid attributes" do
    expect(@user).to be_valid
  end

  it "is not valid without an email" do
    user_without_email = build(:user, email: nil)
    expect(user_without_email).to_not be_valid
  end

  it "is not valid without a correct email" do
    user_with_incorrect_email = build(
      :user, email: 'not real email address')
    expect(user_with_incorrect_email).to_not be_valid
  end
end