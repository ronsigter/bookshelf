# frozen_string_literal: true

class ApplicationController < ActionController::API
  def authorize_request
    header = request.headers["Authorization"]
    token = header.split(" ").last if header

    begin
      decoded = JwtService.decode(token)
      @user = User.find(decoded[:user_id])
    rescue
      render(json: { errors: ["Access denied due to invalid credentials"] }, status: :unauthorized)
    end
  end
end
