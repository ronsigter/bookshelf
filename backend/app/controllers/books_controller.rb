# frozen_string_literal: true

# Books Controller
class BooksController < ApplicationController
  def index
    if params[:page]
      @books = Book.page(params[:page]).per(params[:per_page])
    end

    render(json: { data: {
      items: books,
      pages: books.total_pages,
      current_page: books.current_page,
      count: books.total_count,
    } }, status: :ok)
  end

  def show
    render(json: { data: book }, status: :ok)
  end

  def new
    @book = Book.new
  end

  def create
    @book = Book.create(book_params)

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

  def book
    @book ||= Book.find_by(id: params[:id])
  end

  def books
    @books ||= Book.page(1)
  end
end
