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
FactoryBot.define do
  factory :book do
    title { Faker::Book.title }
    description { Faker::Lorem.paragraph(sentence_count: 5) }
  end
end
