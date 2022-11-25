# frozen_string_literal: true

class AuthenticationController < ApplicationController
  def create
    user = User.find_by(username: login_params[:username])

    if user&.authenticate(login_params[:password])
      token = JwtService.encode(user_id: user.id)
      render(json: { data: { token: token, username: user.username } }, status: :created)
    else
      render(json: { errors: ["Unauthorized"] }, status: :unauthorized)
    end
  end

  private

  def login_params
    params.require(:login).permit(:username, :password)
  end
end
