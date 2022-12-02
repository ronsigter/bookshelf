# frozen_string_literal: true

class ApplicationController < ActionController::API
  def authorize_request
    header = request.headers["Authorization"]
    token = header.split(" ").last if header

    begin
      decoded = JwtService.decode(token)
      @user = User.find(decoded[:user_id])
    rescue ActiveRecord::RecordNotFound
      render(json: { errors: ["User does not exists"] }, status: :unauthorized)
    rescue JWT::DecodeError
      render(json: { errors: ["Invalid token provided"] }, status: :unauthorized)
    rescue
      render(json: { errors: ["Unauthorized request detected"] }, status: :unauthorized)
    end
  end
end
