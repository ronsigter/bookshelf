# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id              :uuid             not null, primary key
#  password_digest :string
#  username        :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_username  (username) UNIQUE
#
class User < ApplicationRecord
  has_many :reading_lists, dependent: :destroy
  has_many :books, through: :reading_lists

  has_secure_password
  validates :username, presence: true, uniqueness: true
  validates :password, length: { minimum: 8 }
end
