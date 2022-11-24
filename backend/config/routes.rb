# frozen_string_literal: true

Rails.application.routes.draw do
  scope "/api" do
    scope "/v1" do
      post "/signup", to: "registration#signup"
      resources :books
    end
  end
end
