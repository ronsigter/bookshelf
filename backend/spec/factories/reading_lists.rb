# frozen_string_literal: true

# == Schema Information
#
# Table name: reading_lists
#
#  id         :uuid             not null, primary key
#  status     :string           default("unread")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  book_id    :uuid
#  user_id    :uuid
#
# Indexes
#
#  index_reading_lists_on_book_id  (book_id)
#  index_reading_lists_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (book_id => books.id)
#  fk_rails_...  (user_id => users.id)
#
FactoryBot.define do
  factory :reading_list do
  end
end
