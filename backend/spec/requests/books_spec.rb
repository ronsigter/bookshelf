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

      it { expect(response).to(have_http_status(:ok)) }
      it { expect(data).to(include({ id: book.id })) }
      it { expect(data).to(include({ title: book.title })) }
      it { expect(data).to(include({ description: book.description })) }
    end

    context "when book does not exists" do
      let(:book_id) { SecureRandom.uuid }

      it { expect(response).to(have_http_status(:ok)) }
      it { expect(data).to(be_nil) }
    end
  end

  describe "GET /api/v1/books" do
    subject(:request) { get("/api/v1/books/", params: params) }

    before { request }

    context "when there's no page parameter" do
      let(:params) { {} }

      it { expect(response).to(have_http_status(:ok)) }
      it { expect(error_messages).to(be_nil) }
      it { expect(data[:items].length).to(be(20)) }
      it { expect(data[:pages]).to(be(5)) }
      it { expect(data[:current_page]).to(be(1)) }
      it { expect(data[:count]).to(be(100)) }
    end

    context "when there's a page parameter" do
      let(:params) { { page: 5, per_page: 10 } }

      it { expect(response).to(have_http_status(:ok)) }
      it { expect(error_messages).to(be_nil) }
      it { expect(data[:items].length).to(be(10)) }
      it { expect(data[:pages]).to(be(10)) }
      it { expect(data[:current_page]).to(be(5)) }
      it { expect(data[:count]).to(be(100)) }
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

      it { expect(response).to(have_http_status(:created)) }
      it { expect(error_messages).to(be_nil) }
      it { expect(data).to(include({ title: "Angels and Demons" })) }
      it { expect(data).to(include({ description: "Angels & Demons is a 2000 bestselling mystery-thriller novel" })) }
    end

    context "when params are missing" do
      let(:params) { { book: { unknown: "unknown" } } }

      it { expect(response).to(have_http_status(:unprocessable_entity)) }
      it { expect(data).to(be_nil) }
      it { expect(error_messages).to(include("Title can't be blank")) }
      it { expect(error_messages).to(include("Description can't be blank")) }
    end
  end
end
