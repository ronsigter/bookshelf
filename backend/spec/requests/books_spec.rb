# frozen_string_literal: true

# RSpec test for Books Controller
require "rails_helper"

RSpec.describe("Books") do
  describe "POST /api/v1/books/" do
    subject(:request) { post("/api/v1/books/", params: params) }

    let(:data) { json_body[:data] }
    let(:error_messages) { json_body[:errors] }

    before { request }

    context "when params are valid" do
      let(:params) do
        { book: { title: "Angels and Demons",
                  description: "Angels & Demons is a 2000 bestselling mystery-thriller novel", } }
      end

      it "returns a :created status" do
        expect(response).to(have_http_status(:created))
      end

      it "does not return an error field" do
        expect(error_messages).to(be_nil)
      end

      it "returns created book object" do
        expect(json_body[:data]).to(include({
          title: "Angels and Demons",
          description: "Angels & Demons is a 2000 bestselling mystery-thriller novel",
        }))
      end
    end

    context "when params are missing" do
      let(:params) { { book: { unknown: "unknown" } } }

      it "returns a :unprocessable_entity status" do
        expect(response).to(have_http_status(:unprocessable_entity))
      end

      it "does not return a data field" do
        expect(data).to(be_nil)
      end

      it "returns error message for missing title field" do
        expect(error_messages).to(include("Title can't be blank"))
      end

      it "returns error message for missing description field" do
        expect(error_messages).to(include("Description can't be blank"))
      end
    end
  end
end
