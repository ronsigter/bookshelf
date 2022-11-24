# frozen_string_literal: true

Rails.application.routes.draw do
  scope "/api" do
    scope "/v1" do
      post "/register", to: "registration#register"
      resources :books
    end
  end
end
