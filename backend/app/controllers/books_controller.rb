# frozen_string_literal: true

# Books Controller
class BooksController < ApplicationController
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
end
