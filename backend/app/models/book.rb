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
class Book < ApplicationRecord
  has_one_attached :image

  has_many :reading_lists, dependent: :destroy
  has_many :users, through: :reading_lists

  validates :title, :description, presence: true

  paginates_per 20
end
