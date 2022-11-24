# frozen_string_literal: true

require "rails_helper"

RSpec.describe("Registration") do
  describe "POST /api/registration/" do
    subject(:request) { post("/api/registration/", params: params) }

    let(:decoded_token) { JwtService.decode(json_body[:data][:token]) }
    let(:data) { json_body[:data] }
    let(:error_messages) { json_body[:errors] }
    let(:user_data) { json_body[:data][:user] }

    before { request }

    context "when params are valid" do
      let(:params) { { user: { username: "book_user", password: "password" } } }

      it "returns a :created status" do
        expect(response).to(have_http_status(:created))
      end

      it "does not return an error field" do
        expect(error_messages).to(be_nil)
      end

      it "returns token of created user" do
        expect(decoded_token["user_id"]).to(eql(user_data[:id]))
      end
    end

    context "when username exists" do
      let(:params) { { user: { username: "book_user_0" } } }

      before { create(:user) }

      it "returns a :unprocessable_entity status" do
        expect(response).to(have_http_status(:unprocessable_entity))
      end

      it "does not return a data field" do
        expect(data).to(be_nil)
      end

      it "returns error message for existing username" do
        expect(error_messages).to(include("Username has already been taken"))
      end
    end

    context "when params are missing" do
      let(:params) { { user: { unknown: "unknown" } } }

      it "returns a :unprocessable_entity status" do
        expect(response).to(have_http_status(:unprocessable_entity))
      end

      it "does not return a data field" do
        expect(data).to(be_nil)
      end

      it "returns error message for missing password field" do
        expect(error_messages).to(include("Password can't be blank"))
      end

      it "returns error message for missing username field" do
        expect(error_messages).to(include("Username can't be blank"))
      end
    end

    context "when password length is below 8 characters" do
      let(:params) { { user: { username: "test", password: "pass" } } }

      it "returns a :unprocessable_entity status" do
        expect(response).to(have_http_status(:unprocessable_entity))
      end

      it "does not return a data field" do
        expect(data).to(be_nil)
      end

      it "returns error message for password length field" do
        expect(error_messages).to(include("Password is too short (minimum is 8 characters)"))
      end
    end
  end
end
