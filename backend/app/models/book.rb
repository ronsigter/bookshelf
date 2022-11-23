# Book model
class Book < ApplicationRecord
  validates :title, :description, presence: true
end
