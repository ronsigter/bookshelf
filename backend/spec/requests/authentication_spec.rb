# frozen_string_literal: true

require "rails_helper"

RSpec.describe("Authentication") do
  before { create(:user, username: "book_user", password: "password") }

  describe "POST /api/login/" do
    subject(:request) { post("/api/login/", params: params) }

    let(:data) { json_body[:data] }
    let(:error_messages) { json_body[:errors] }

    before { request }

    context "when existing user enters correct credentials" do
      let(:params) { { login: { username: "book_user", password: "password" } } }

      it "returns :created status" do
        expect(response).to(have_http_status(:created))
      end

      it "does not return an error field" do
        expect(error_messages).to(be_nil)
      end

      it "returns data field with token" do
        expect(data[:token].split(".").length).to(be(3))
      end
    end

    context "when user does not exists" do
      let(:params) { { login: { username: "non_existent_user", password: "password" } } }

      it "returns :unauthorized status" do
        expect(response).to(have_http_status(:unauthorized))
      end

      it "does not return a data field" do
        expect(data).to(be_nil)
      end

      it "returns error message for unauthorized login" do
        expect(error_messages).to(include("Unauthorized"))
      end
    end

    context "when existing user enters a wrong password" do
      let(:params) { { login: { username: "book_user", password: "pashwerd" } } }

      it "returns :unauthorized status" do
        expect(response).to(have_http_status(:unauthorized))
      end

      it "does not return a data field" do
        expect(data).to(be_nil)
      end

      it "returns error message for unauthorized login" do
        expect(error_messages).to(include("Unauthorized"))
      end
    end
  end
end
