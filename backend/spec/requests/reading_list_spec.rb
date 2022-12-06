# frozen_string_literal: true

# RSpec test for Books Controller
require "rails_helper"

RSpec.describe("ReadingList") do
  let(:user) { create(:user) }
  let(:headers) { generate_authorization_header(user) }
  let(:book) { Book.first }

  before { create_list(:book, 100) }

  shared_examples "an unauthorized request" do
    let(:headers) { {} }

    it { expect(response).to(have_http_status(:unauthorized)) }
    it { expect(json_body[:errors]).to(include("Unauthorized request detected")) }
  end

  describe "POST /api/v1/reading_lists/" do
    subject(:request) { post("/api/v1/reading_lists/", params: params, headers: headers) }

    let(:params) do
      { reading_list: { book_id: book.id } }
    end

    before { request }

    context "when requesting client is unauthorized" do
      it_behaves_like "an unauthorized request"
    end

    context "when params are valid" do
      it { expect(response).to(have_http_status(:created)) }
      it { expect(json_body[:errors]).to(be_nil) }
      it { expect(json_body[:data]).to(include({ book_id: book.id })) }
      it { expect(json_body[:data]).to(include({ user_id: user.id })) }
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
