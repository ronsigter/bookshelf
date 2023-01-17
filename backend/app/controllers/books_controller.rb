# frozen_string_literal: true

# Books Controller
class BooksController < ApplicationController
  before_action :authorize_request

  def user_books_index
    render(json: BookSerializer.new(user_books, pagination(user_books)), status: :ok)
  end

  def index
    render(json: BookSerializer.new(book_ref, pagination(books)), status: :ok)
  end

  def show
    render(json: BookSerializer.new(book, { params: { current_user: current_user } }), status: :ok)
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
    search ||= params[:search] ? params[:search] : "*"
    @books ||= Book.search(search, page: params[:page], per_page: 20)
  end

  def book_ref
    @book_ref ||= books.map { |book| book }
  end

  def user_books
    current_user.books.page(params[:page])
  end

  def pagination(object)
    meta_pagination(object, { params: { current_user: current_user } })
  end
end
