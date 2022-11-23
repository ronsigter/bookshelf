# frozen_string_literal: true

class CreateBooks < ActiveRecord::Migration[7.0]
  def change
    create_table :books, id: :uuid do |t|
      t.string :title
      t.text :description

      t.timestamps
    end

    add_index :books, :title
  end
end
