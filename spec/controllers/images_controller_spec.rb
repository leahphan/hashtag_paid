require "rails_helper"

RSpec.describe ImagesController, type: :controller do

  before(:all) do
    @image = create(:image)
  end

  it "should get index" do
    get :index, format: :json

    expect(response.status).to eq(200)
  end

  context 'Pagination' do
    before do
      Image.delete_all
      25.times do
        create(:image)
      end
    end

    it "should return 20 results" do
      get :index, params: { page: 1 }, format: :json

      expect(response.status).to eq(200)
      json = JSON.parse(response.body).with_indifferent_access

      expect(json[:data].length).to eq(20)
    end

    it "should return total pages count" do
      get :index, params: { page: 1 }, format: :json

      expect(response.status).to eq(200)
      json = JSON.parse(response.body).with_indifferent_access

      expect(json[:total_pages]).to eq(2)
    end
  end

  it "should get query by name" do
    Image.delete_all
    user = create(:user, name: 'Susan')
    image2 = create(:image, user: user)

    get :index, params: { q: { user_name_cont: 'susan' } }, format: :json

    expect(response.status).to eq(200)
    json = JSON.parse(response.body).with_indifferent_access

    expect(json[:data].length).to eq(1)
    expect(json[:data][0][:id]).to eq(image2.id)
    expect(json[:data][0][:picture]).to eq(image2.picture)
  end

  it "should sort by name" do
    Image.delete_all
    user = create(:user, name: 'Abbie')
    image = create(:image, user: user)
    user2 = create(:user, name: 'Susan')
    image2 = create(:image, user: user2)

    get :index, params: { q: { s: 'user_name asc' } }, format: :json

    expect(response.status).to eq(200)
    json = JSON.parse(response.body).with_indifferent_access

    expect(json[:data].length).to eq(2)
    expect(json[:data][0][:id]).to eq(image.id)
    expect(json[:data][1][:id]).to eq(image2.id)
  end

  it "should sort by age" do
    Image.delete_all
    user = create(:user, age: 20)
    image = create(:image, user: user)
    user2 = create(:user, age: 25)
    image2 = create(:image, user: user2)

    get :index, params: { q: { s: 'user_age asc' } }, format: :json

    expect(response.status).to eq(200)
    json = JSON.parse(response.body).with_indifferent_access

    expect(json[:data].length).to eq(2)
    expect(json[:data][0][:id]).to eq(image.id)
    expect(json[:data][1][:id]).to eq(image2.id)
  end

  it "should sort by likes" do
    Image.delete_all
    image = create(:image, likes: 100)
    image2 = create(:image, likes: 0)

    get :index, params: { q: { s: 'likes desc' } }, format: :json

    expect(response.status).to eq(200)
    json = JSON.parse(response.body).with_indifferent_access

    expect(json[:data].length).to eq(2)
    expect(json[:data][0][:id]).to eq(image.id)
    expect(json[:data][1][:id]).to eq(image2.id)
  end

  it "should sort by comments" do
    Image.delete_all
    image = create(:image, comments: 100)
    image2 = create(:image, comments: 0)

    get :index, params: { q: { s: 'comments desc' } }, format: :json

    expect(response.status).to eq(200)
    json = JSON.parse(response.body).with_indifferent_access

    expect(json[:data].length).to eq(2)
    expect(json[:data][0][:id]).to eq(image.id)
    expect(json[:data][1][:id]).to eq(image2.id)
  end

  it "should show image with user data" do
    get :show, params: { id: @image.id }, format: :json

    json = JSON.parse(response.body).with_indifferent_access
    expect(json[:id]).to eq(@image.id)
    expect(json[:picture]).to eq(@image.picture)
    expect(json[:user][:name]).to eq(@image.user.name)
    expect(json[:user][:email]).to eq(@image.user.email)
  end
end