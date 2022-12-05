# frozen_string_literal: true

class CollectionPresenter
  attr_reader :collection

  def initialize(collection)
    @collection = collection
  end

  def as_json(*)
    { data: presenter }
  end

  private

  def presenter
    {
      items: collection,
      pages: collection.total_pages,
      current_page: collection.current_page,
      count: collection.total_count,
    }
  end
end