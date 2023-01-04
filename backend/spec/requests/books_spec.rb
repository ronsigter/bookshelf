# frozen_string_literal: true

# RSpec test for Books Controller
require "rails_helper"

RSpec.describe("Books") do
  let(:data) { json_body[:data] }
  let(:error_messages) { json_body[:errors] }
  let(:headers) { generate_authorization_header(User.find_by(username: "user-0")) }

  before do
    create_list(:book, 100)
    build_list(:user, 2) do |user, i|
      user.username = "user-#{i}"
      user.save!
    end
  end

  shared_examples "an unauthorized request" do
    let(:headers) { {} }

    it { expect(response).to(have_http_status(:unauthorized)) }
    it { expect(error_messages).to(include("Unauthorized request detected")) }
  end

  describe "GET /api/v1/books/:id" do
    subject(:request) { get("/api/v1/books/#{book_id}", params: {}, headers: headers) }

    let(:book) { Book.first }
    let(:book_id) { book.id }

    before do
      create(:reading_list, user: User.find_by(username: "user-0"), book: book)
      request
    end

    shared_examples "an existing book" do
      it { expect(response).to(have_http_status(:ok)) }
      it { expect(error_messages).to(be_nil) }
      it { expect(data[:attributes]).to(include({ id: book.id })) }
      it { expect(data[:attributes]).to(include({ title: book.title })) }
      it { expect(data[:attributes]).to(include({ description: book.description })) }
      it { expect(data[:attributes][:image][:url]).to(be_a(String)) }
    end

    context "when requesting client is unauthorized" do
      it_behaves_like "an unauthorized request"
    end

    context "when book exists and user is part of reading list" do
      it_behaves_like "an existing book"
      it { expect(data[:attributes]).to(include({ reading_status: "unread" })) }
    end

    context "when book exists and user is not part of reading list" do
      let(:headers) { generate_authorization_header(User.find_by(username: "user-1")) }

      it_behaves_like "an existing book"
      it { expect(data[:attributes]).to(include({ reading_status: nil })) }
    end

    context "when book does not exists" do
      let(:book_id) { SecureRandom.uuid }

      it { expect(response).to(have_http_status(:ok)) }
      it { expect(data).to(be_nil) }
    end
  end

  describe "GET /api/v1/books" do
    subject(:request) { get("/api/v1/books/", params: params, headers: headers) }

    let(:params) { { page: 5 } }

    before { request }

    context "when requesting client is unauthorized" do
      it_behaves_like "an unauthorized request"
    end

    context "when there's no page parameter" do
      let(:params) { {} }

      it { expect(response).to(have_http_status(:ok)) }
      it { expect(error_messages).to(be_nil) }
      it { expect(data.length).to(be(20)) }
      it { expect(json_body[:meta][:pagination][:current_page]).to(be(1)) }
      it { expect(json_body[:meta][:pagination][:next_page]).to(be(2)) }
      it { expect(json_body[:meta][:pagination][:prev_page]).to(be_nil) }
      it { expect(json_body[:meta][:pagination][:total_pages]).to(be(5)) }
    end

    context "when there's a page parameter" do
      it { expect(response).to(have_http_status(:ok)) }
      it { expect(error_messages).to(be_nil) }
      it { expect(data.length).to(be(20)) }
      it { expect(json_body[:meta][:pagination][:current_page]).to(be(5)) }
      it { expect(json_body[:meta][:pagination][:next_page]).to(be_nil) }
      it { expect(json_body[:meta][:pagination][:prev_page]).to(be(4)) }
      it { expect(json_body[:meta][:pagination][:total_pages]).to(be(5)) }
    end

    context "when there's a search parameter" do
      let(:params) { { search: "book 1" } }

      it { expect(response).to(have_http_status(:ok)) }
      it { expect(error_messages).to(be_nil) }
      it { expect(data.length).to(be(20)) }
      it { expect(json_body[:meta][:pagination][:current_page]).to(be(5)) }
      it { expect(json_body[:meta][:pagination][:next_page]).to(be_nil) }
      it { expect(json_body[:meta][:pagination][:prev_page]).to(be(4)) }
      it { expect(json_body[:meta][:pagination][:total_pages]).to(be(5)) }
    end
  end

  describe "POST /api/v1/books/" do
    subject(:request) { post("/api/v1/books/", params: params, headers: headers) }

    let(:file) do
      Rack::Test::UploadedFile.new(Rails.root.join("spec/fixtures/book_test.jpeg"), "image/jpeg")
    end
    let(:params) do
      { book: { title: "Angels and Demons",
                description: "Angels & Demons is a 2000 bestselling mystery-thriller novel",
                image: file, } }
    end

    before { request }

    context "when requesting client is unauthorized" do
      it_behaves_like "an unauthorized request"
    end

    context "when params are valid" do
      it { expect(response).to(have_http_status(:created)) }
      it { expect(error_messages).to(be_nil) }
      it { expect(data[:attributes]).to(include({ title: "Angels and Demons" })) }

      it {
        expect(data[:attributes]).to(include(
         { description: "Angels & Demons is a 2000 bestselling mystery-thriller novel" },
       ))
      }

      it { expect(data[:attributes][:image][:url]).to(be_a(String)) }
    end

    context "when params are missing" do
      let(:params) { { book: { unknown: "unknown" } } }

      it { expect(response).to(have_http_status(:unprocessable_entity)) }
      it { expect(data).to(be_nil) }
      it { expect(error_messages).to(include("Title can't be blank")) }
      it { expect(error_messages).to(include("Description can't be blank")) }
      it { expect(error_messages).to(include("Image can't be blank")) }
    end

    context "when image file type is not accepted" do
      let(:file) do
        Rack::Test::UploadedFile.new(Rails.root.join("spec/fixtures/dummy.pdf"), "application/pdf")
      end

      it { expect(response).to(have_http_status(:unprocessable_entity)) }
      it { expect(data).to(be_nil) }
      it { expect(error_messages).to(include("Image has an invalid content type")) }
    end

    context "when image file size is not accepted" do
      let(:file) do
        Rack::Test::UploadedFile.new(Rails.root.join("spec/fixtures/image_5mb.png"), "image/png")
      end

      it { expect(response).to(have_http_status(:unprocessable_entity)) }
      it { expect(data).to(be_nil) }
      it { expect(error_messages).to(include("Image Image must be less than 2MB in size")) }
    end
  end
end
