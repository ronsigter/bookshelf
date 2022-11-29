# frozen_string_literal: true

# Books Controller
class BooksController < ApplicationController
  before_action :set_book, only: [:show]

  def index
    books = Book.all

    render(json: { data: books }, status: :ok)
  end

  def show
    render(json: { data: @book }, status: :ok)
  end

  def new
    @book = Book.new
  end

  def create
    book = Book.create(book_params)

    if book.valid?
      render(json: { data: book }, status: :created)
    else
      render(json: { errors: book.errors.full_messages }, status: :unprocessable_entity)
    end
  end

  private

  def book_params
    params.require(:book).permit(:title, :description)
  end

  def set_book
    @book = Book.find_by(id: params[:id])
  end
end
