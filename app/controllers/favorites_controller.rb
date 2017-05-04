class FavoritesController < ApplicationController
  before_action :authenticate_user!

  def index
    @favorites = current_user.favorites
  end

  def create
    favorite = Favorite.new(favorite_params)
    favorite.user_id = current_user.id

    if favorite.save
      render json: {message: 'Successful favorite'}, status: 200
    else
      render json: {message: 'Error adding favorite'}, status: 500
    end
  end

  def destroy

  end

  private

  def favorite_params
    params.require(:favorite).permit(:title, :url, :author, :uuid)
  end
end
