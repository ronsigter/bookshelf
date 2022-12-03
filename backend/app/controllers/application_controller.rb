# frozen_string_literal: true

class ApplicationController < ActionController::API
  def authorize_request
    header = request.headers["Authorization"]
    token = header.split(" ").last if header

    begin
      decoded = JwtService.decode(token)
      @user = User.find(decoded[:user_id])
    rescue ActiveRecord::RecordNotFound, JWT::DecodeError
      render(json: { errors: ["Unauthorized request detected"] }, status: :unauthorized)
    rescue
      # TODO: Log to an error monitoring tool
      render(json: { errors: ["Unauthorized request detected"] }, status: :unauthorized)
    end
  end
end
