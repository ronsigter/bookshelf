# frozen_string_literal: true

# RSpec test for Books Controller
require "rails_helper"

RSpec.describe("ReadingList") do
  let(:user) { create(:user) }
  let(:headers) { generate_authorization_header(user) }
  let(:book) { Book.first }
  let(:reading_list) { ReadingList.first }

  before do
    create(:book)
    create(:reading_list)
  end

  shared_examples "an unauthorized request" do
    let(:headers) { {} }

    it { expect(response).to(have_http_status(:unauthorized)) }
    it { expect(json_body[:errors]).to(include("Unauthorized request detected")) }
  end

  describe "DELETE /api/v1/reading_list/:id" do
    subject(:request) { delete("/api/v1/reading_lists/#{reading_list.id}", params: params, headers: headers) }

    let(:params) { {} }

    before { request }

    context "when requesting client is unauthorized" do
      it_behaves_like "an unauthorized request"
    end

    context "when accessing client does not own the record" do
      let(:headers) { generate_authorization_header(user) }

      it { expect(response).to(have_http_status(:not_found)) }
      it { expect(json_body[:errors]).to(include("Reading list not found")) }
      it { expect(json_body[:data]).to(be_nil) }
    end

    context "when accessing client does own the record" do
      let(:headers) { generate_authorization_header(reading_list.user) }

      it { expect(response).to(have_http_status(:ok)) }
      it { expect(json_body[:data]).to(include({ message: "Successfully deleted" })) }
    end
  end

  describe "PUT /api/v1/reading_list/:id" do
    subject(:request) { put("/api/v1/reading_lists/#{reading_list.id}", params: params, headers: headers) }

    let(:params) { { reading_list: { status: "finished" } } }

    before { request }

    context "when requesting client is unauthorized" do
      it_behaves_like "an unauthorized request"
    end

    context "when accessing client does not own the record" do
      let(:headers) { generate_authorization_header(user) }

      it { expect(response).to(have_http_status(:not_found)) }
      it { expect(json_body[:errors]).to(include("Reading list not found")) }
      it { expect(json_body[:data]).to(be_nil) }
    end

    context "when accessing client does own the record" do
      let(:headers) { generate_authorization_header(reading_list.user) }

      it { expect(response).to(have_http_status(:ok)) }
      it { expect(json_body[:errors]).to(be_nil) }
      it { expect(json_body[:data]).to(include({ id: reading_list.id })) }
      it { expect(json_body[:data]).to(include({ book_id: reading_list.book_id })) }
      it { expect(json_body[:data]).to(include({ user_id: reading_list.user_id })) }
      it { expect(json_body[:data]).to(include({ status: "finished" })) }
    end

    context "when status params is of invalid value" do
      let(:headers) { generate_authorization_header(reading_list.user) }
      let(:params) { { reading_list: { status: "unknown" } } }

      it { expect(response).to(have_http_status(:unprocessable_entity)) }
      it { expect(json_body[:errors]).to(include("Status is not included in the list")) }
      it { expect(json_body[:data]).to(be_nil) }
    end
  end

  describe "POST /api/v1/reading_lists/" do
    subject(:request) { post("/api/v1/reading_lists/", params: params, headers: headers) }

    let(:params) { { reading_list: { book_id: book.id } } }

    before { request }

    context "when requesting client is unauthorized" do
      it_behaves_like "an unauthorized request"
    end

    context "when params are valid" do
      it { expect(response).to(have_http_status(:created)) }
      it { expect(json_body[:errors]).to(be_nil) }
      it { expect(json_body[:data]).to(include({ book_id: book.id })) }
      it { expect(json_body[:data]).to(include({ user_id: user.id })) }
      it { expect(json_body[:data]).to(include({ status: "unread" })) }
    end

    context "when book does not exists" do
      let(:params) { { reading_list: { book_id: SecureRandom.uuid } } }

      it { expect(response).to(have_http_status(:unprocessable_entity)) }
      it { expect(json_body[:data]).to(be_nil) }
      it { expect(json_body[:errors]).to(include("Book must exist")) }
    end

    context "when params are missing" do
      let(:params) { { reading_list: { unknown: "unknown" } } }

      it { expect(response).to(have_http_status(:unprocessable_entity)) }
      it { expect(json_body[:data]).to(be_nil) }
      it { expect(json_body[:errors]).to(include("Book must exist")) }
    end
  end
end
