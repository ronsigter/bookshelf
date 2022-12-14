# frozen_string_literal: true

Rails.application.routes.draw do
  scope :api do
    post :registration, to: "registration#create"

    post :login, to: "authentication#create"

    scope :v1 do
      resources :books, only: [:create, :index, :show]
      resources :reading_lists, only: [:create, :update, :destroy]
    end
  end
end
