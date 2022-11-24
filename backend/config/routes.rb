# frozen_string_literal: true

Rails.application.routes.draw do
  scope "/api" do
    post "/registration", to: "registration#create"

    scope "/v1" do
      resources :books
    end
  end
end
