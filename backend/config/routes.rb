# frozen_string_literal: true

Rails.application.routes.draw do
  scope "/api" do
    post "/registration", to: "registration#create"

    post "/login", to: "authentication#login"

    scope "/v1" do
      resources :books
    end
  end
end
