# frozen_string_literal: true

require "rails_helper"

RSpec.describe("JwtService") do
  let(:payload) { { user_id: "just_a_random_id" } }
  let!(:exp) { 7.hours.from_now }
  let(:encode) { JwtService.encode(payload, exp) }
  let(:token) { encode }
  let(:decode) { JwtService.decode(token) }

  describe "encode payload" do
    subject { encode }

    it { is_expected.to(be_a(String)) }
  end

  describe "decode token" do
    subject { decode }

    it { is_expected.to(include(user_id: "just_a_random_id")) }
    it { is_expected.to(include(exp: exp.to_i)) }
  end
end
