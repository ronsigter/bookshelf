# frozen_string_literal: true

class ReadingListsController < ApplicationController
  before_action :authorize_request

  def create
    @reading_list = @user.reading_lists.create(reading_list_params)

    if reading_list.valid?
      render(json: { data: reading_list }, status: :created)
    else
      render(json: { errors: reading_list.errors.full_messages }, status: :unprocessable_entity)
    end
  end

  def update
    if reading_list.blank?
      render(json: { errors: ["Reading list not found"] }, status: :not_found)
    elsif reading_list.update(reading_list_params)
      render(json: { data: reading_list }, status: :ok)
    else
      render(json: { errors: reading_list.errors.full_messages }, status: :unprocessable_entity)
    end
  end

  def destroy
    if reading_list.present?
      reading_list.destroy
      render(json: { data: { message: "Successfully deleted" } }, status: :ok)
    else
      render(json: { errors: ["Reading list not found"] }, status: :not_found)
    end
  end

  private

  def reading_list_params
    params.require(:reading_list).permit(:book_id, :status)
  end

  def reading_list
    @reading_list ||= @user.reading_lists.find_by(id: params[:id])
  end
end
