# frozen_string_literal: true

class CollectionPresenter
  attr_reader :collection

  def initialize(collection, serializer)
    @collection = collection
    @serializer = serializer
  end

  def as_json(*)
    { data: presenter }
  end

  private

  def presenter
    {
      items: collection.map { |unit| @serializer.new(unit) },
      pages: collection.total_pages,
      current_page: collection.current_page,
      count: collection.total_count,
    }
  end
end
