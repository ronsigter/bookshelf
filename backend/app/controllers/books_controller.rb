# frozen_string_literal: true

# Books Controller
class BooksController < ApplicationController
  before_action :authorize_request

  def index
    render(json: CollectionPresenter.new(books), status: :ok)
  end

  def show
    render(json: { data: book }, status: :ok)
  end

  def new
    @book = Book.new
  end

  def create
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
    @book ||= params[:id] ? Book.find_by(id: params[:id]) : Book.create(book_params)
  end

  def books
    @books ||= Book.page(params[:page])
  end
end
