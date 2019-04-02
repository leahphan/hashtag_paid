class ImagesController < ApplicationController
  before_action :set_image, only: [:show, :update, :destroy]

  # GET /images
  def index
    @q = Image.ransack(params[:q])
    @images = @q.result.page(params[:page]).per_page(20).order(created_at: 'DESC').to_a.uniq

    render json: @images
  end

  # GET /images/1
  def show
    render json: @image, :include => [ :user ]
  end

  # POST /images
  def create
    @image = Image.new(image_params)

    if @image.save
      render json: @image, status: :created, location: @image
    else
      render json: @image.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /images/1
  def update
    if @image.update(image_params)
      render json: @image
    else
      render json: @image.errors, status: :unprocessable_entity
    end
  end

  # DELETE /images/1
  def destroy
    @image.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_image
      @image = Image.includes(:user).find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def image_params
      params.require(:image).permit(:user_id_id, :guid, :picture, :caption, :likes, :comments, :tags)
    end
end
