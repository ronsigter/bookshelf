# frozen_string_literal: true

class ReadingListsController < ApplicationController
  before_action :authorize_request

  def create
    if reading_list.valid?
      render(json: { data: reading_list }, status: :created)
    else
      render(json: { errors: reading_list.errors.full_messages }, status: :unprocessable_entity)
    end
  end

  def update
    if !user_owns_reading_list?
      render(json: { errors: ["Unauthorized request detected"] }, status: :unauthorized)
    elsif reading_list.update(reading_list_params)
      render(json: { data: reading_list }, status: :created)
    else
      render(json: { errors: reading_list.errors.full_messages }, status: :unprocessable_entity)
    end
  end

  private

  def reading_list_params
    params.require(:reading_list).permit(:book_id, :status).merge({ user_id: @user.id })
  end

  def reading_list
    @reading_list ||= params[:id] ? ReadingList.find_by(id: params[:id]) : ReadingList.create(reading_list_params)
  end

  def user_owns_reading_list?
    reading_list.user_id == @user.id
  end
end
