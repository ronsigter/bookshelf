# frozen_string_literal: true

# RSpec test for My Books Controller
require "rails_helper"

RSpec.describe("MyBooks") do
  let(:data) { json_body[:data] }
  let(:error_messages) { json_body[:errors] }
  let(:headers) { generate_authorization_header(User.find_by(username: "user-0")) }

  before do
    create(:user_with_books, books_count: 10, username: "user-0")
    create(:user, username: "user-1")
  end

  shared_examples "an unauthorized request" do
    let(:headers) { {} }

    it { expect(response).to(have_http_status(:unauthorized)) }
    it { expect(error_messages).to(include("Unauthorized request detected")) }
  end

  describe "GET /api/v1/my_books" do
    subject(:request) { get("/api/v1/my_books/", params: {}, headers: headers) }

    before { request }

    context "when requesting client is unauthorized" do
      it_behaves_like "an unauthorized request"
    end

    context "when there are reading lists of user" do
      let(:params) { {} }

      it { expect(response).to(have_http_status(:ok)) }
      it { expect(error_messages).to(be_nil) }
      it { expect(data.length).to(be(10)) }
      it { expect(json_body[:meta][:pagination][:current_page]).to(be(1)) }
      it { expect(json_body[:meta][:pagination][:next_page]).to(be_nil) }
      it { expect(json_body[:meta][:pagination][:prev_page]).to(be_nil) }
      it { expect(json_body[:meta][:pagination][:total_pages]).to(be(1)) }
    end
  end
end
