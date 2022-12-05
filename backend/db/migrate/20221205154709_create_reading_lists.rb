# frozen_string_literal: true

class CreateReadingLists < ActiveRecord::Migration[7.0]
  def change
    create_table(:reading_lists, id: :uuid) do |t|
      t.references(:user, type: :uuid, foreign_key: true)
      t.references(:book, type: :uuid, foreign_key: true)
      t.string(:status, default: "unread")
      t.timestamps
    end
  end
end
