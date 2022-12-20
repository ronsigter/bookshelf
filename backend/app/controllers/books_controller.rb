# frozen_string_literal: true

# Books Controller
class BooksController < ApplicationController
  before_action :authorize_request

  def index
    render(json: BookSerializer.new(books, meta_pagination(books)), status: :ok)
  end

  def show
    render(json: BookSerializer.new(book), status: :ok)
  end

  def create
    @book = Book.create(book_params)

    if book.valid?
      render(json: BookSerializer.new(book), status: :created)
    else
      render(json: { errors: book.errors.full_messages }, status: :unprocessable_entity)
    end
  end

  private

  def book_params
    params.require(:book).permit(:title, :description, :image)
  end

  def book
    @book ||= Book.find_by(id: params[:id])
  end

  def books
    @books ||= Book.page(params[:page])
  end
end
