# frozen_string_literal: true

class RegistrationController < ApplicationController
  def signup
    user = User.create(user_params)

    if user.valid?
      token = JsonWebToken.encode({ user_id: user.id })
      render(json: { data: { user: user, token: token } }, status: :created)
    else
      render(json: { errors: user.errors.full_messages }, status: :unprocessable_entity)
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
