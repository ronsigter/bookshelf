# frozen_string_literal: true

Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  scope :api do
    post :registration, to: "registration#create"

    post :login, to: "authentication#create"

    scope :v1 do
      resources :books, only: [:create, :index, :show]
      resources :reading_lists, only: [:create, :update, :destroy]
      get :my_books, to: "my_books#index"
    end
  end
end
