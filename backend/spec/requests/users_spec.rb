# frozen_string_literal: true

require "rails_helper"

RSpec.describe("Users") do
  describe "POST /users/" do
    it "returns user object with token if params are valid" do
      post("/users/", params: {
        user: {
          username: "bhoss_killah_mapagmahal",
          password: "p@ssw0rd",
        },
      })
      expect(response).to(have_http_status(:created))
      user = json_body[:data][:user]
      decoded_token = JsonWebToken.decode(json_body[:data][:token])

      expect(user[:id]).to(eql(decoded_token["user_id"]))
      expect(json_body[:errors]).to(be_nil)
    end

    it "returns error if username params already exists" do
      post("/users/", params: {
        user: {
          username: "existing_user",
          password: "p@ssw0rd",
        },
      })
      post("/users/", params: {
        user: {
          username: "existing_user",
          password: "p@ssw0rd",
        },
      })
      expect(response).to(have_http_status(:unprocessable_entity))
      expect(json_body[:data]).to(be_nil)
      expect(json_body[:errors]).to(include("Username has already been taken"))
    end

    it "returns error if password does not met minimum length" do
      post("/users/", params: {
        user: {
          username: "bhoss_killah_mapagmahal",
          password: "pass",
        },
      })
      expect(response).to(have_http_status(:unprocessable_entity))
      expect(json_body[:data]).to(be_nil)
      expect(json_body[:errors]).to(include("Password is too short (minimum is 8 characters)"))
    end
  end
end
