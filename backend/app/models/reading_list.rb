# frozen_string_literal: true

# == Schema Information
#
# Table name: reading_lists
#
#  id         :uuid             not null, primary key
#  status     :enum
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  book_id    :uuid
#  user_id    :uuid
#
# Indexes
#
#  index_reading_lists_on_book_id              (book_id)
#  index_reading_lists_on_status               (status)
#  index_reading_lists_on_user_id              (user_id)
#  index_reading_lists_on_user_id_and_book_id  (user_id,book_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (book_id => books.id)
#  fk_rails_...  (user_id => users.id)
#
class ReadingList < ApplicationRecord
  extend Enumerize
  enumerize :status, in: { unread: "unread", finished: "finished" }, predicates: { prefix: true }, default: :unread

  belongs_to :user
  belongs_to :book

  validates :book_id, uniqueness: { scope: :user_id }
end
