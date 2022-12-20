# frozen_string_literal: true

# == Schema Information
#
# Table name: books
#
#  id          :uuid             not null, primary key
#  description :text
#  title       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_books_on_title  (title)
#
class BookSerializer
  include JSONAPI::Serializer
  singleton_class.include(Rails.application.routes.url_helpers)

  attributes :id, :title, :description

  attribute :image do |object|
    if object.image.attached?
      {
        url: rails_blob_url(object.image),
      }
    end
  end
end
