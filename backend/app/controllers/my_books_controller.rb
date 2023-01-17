# frozen_string_literal: true

class MyBooksController < ApplicationController
  before_action :authorize_request

  def index
    render(json: BookSerializer.new(my_books, pagination(my_books)), status: :ok)
  end

  private

  def my_books
    @my_books ||= current_user.books.page(params[:page])
  end

  def pagination(object)
    meta_pagination(object, { params: { current_user: current_user } })
  end
end
