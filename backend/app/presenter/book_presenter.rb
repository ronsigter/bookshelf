# frozen_string_literal: true

class BookPresenter
  attr_reader :book

  def initialize(book)
    @book = book
  end

  def as_json(*)
    { data: presenter }
  end

  private

  def presenter
    @book ? BookSerializer.new(@book) : nil
  end
end
