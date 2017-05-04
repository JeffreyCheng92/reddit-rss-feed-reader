Rails.application.routes.draw do
  devise_for :users

  root to: 'feeds#index'

  resources 'favorites', only: [:index, :create, :destroy]
end
