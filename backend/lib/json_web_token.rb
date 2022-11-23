# frozen_string_literal: true

class JsonWebToken
  class << self
    JWT_SECRET_KEY = Rails.application.secrets.secret_key_base.to_s
    def encode(payload, exp = 24.hours.from_now)
      payload[:exp] = exp.to_i
      JWT.encode(payload, JWT_SECRET_KEY)
    end

    def decode(token)
      decoded = JWT.decode(token, JWT_SECRET_KEY)[0]
      ActiveSupport::HashWithIndifferentAccess.new(decoded)
    end
  end
end
