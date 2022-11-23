# frozen_string_literal: true

class ApplicationController < ActionController::API
  JWT_SECRET_KEY = Rails.application.secrets.secret_key_base.to_s

  def encode_token(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, JWT_SECRET_KEY)
  end
end
