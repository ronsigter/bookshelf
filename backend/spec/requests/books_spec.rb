# frozen_string_literal: true

# RSpec test for Books Controller
require "rails_helper"

RSpec.describe("Books") do
  let(:data) { json_body[:data] }
  let(:error_messages) { json_body[:errors] }

  before { create_list(:book, 100) }

  describe "GET /api/v1/books/:id" do
    subject(:request) { get("/api/v1/books/#{book_id}") }

    before { request }

    context "when book exists" do
      let(:book) { Book.first }
      let(:book_id) { book.id }

      it "returns an :ok status" do
        expect(response).to(have_http_status(:ok))
      end

      it "returns the book data" do
        expect(data).to(include({
          id: book.id,
          title: book.title,
          description: book.description,
        }))
      end
    end

    context "when book does not exists" do
      let(:book_id) { SecureRandom.uuid }

      it "returns an :ok status" do
        expect(response).to(have_http_status(:ok))
      end

      it "returns null data" do
        expect(data).to(be_nil)
      end
    end
  end

  describe "GET /api/v1/books" do
    subject(:request) { get("/api/v1/books/", params: params) }

    before { request }

    shared_examples "a paginated request" do |status, items_length, pages, current_page, count|
      it "returns an :ok status" do
        expect(response).to(have_http_status(status))
      end

      it "does not return an error field" do
        expect(error_messages).to(be_nil)
      end

      it "returns an array of book object" do
        expect(data[:items].length).to(be(items_length))
      end

      it "returns total number of pages" do
        expect(data[:pages]).to(be(pages))
      end

      it "returns current page of 1" do
        expect(data[:current_page]).to(be(current_page))
      end

      it "returns total number of books" do
        expect(data[:count]).to(be(count))
      end
    end

    context "when there's no page parameter" do
      let(:params) { {} }

      it_behaves_like "a paginated request", :ok, 20, 5, 1, 100
    end

    context "when there's a page parameter" do
      let(:params) { { page: 5, per_page: 10 } }

      it_behaves_like "a paginated request", :ok, 10, 10, 5, 100
    end
  end

  describe "POST /api/v1/books/" do
    subject(:request) { post("/api/v1/books/", params: params) }

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
        expect(data).to(include({
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
