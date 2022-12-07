# frozen_string_literal: true

Rails.application.routes.draw do
  scope :api do
    post :registration, to: "registration#create"

    post :login, to: "authentication#create"

    scope :v1 do
      resources :books
      resources :reading_lists
    end
  end
end
