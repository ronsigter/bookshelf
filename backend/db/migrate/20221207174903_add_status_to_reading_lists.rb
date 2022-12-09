# frozen_string_literal: true

class AddStatusToReadingLists < ActiveRecord::Migration[7.0]
  def up
    execute(<<-SQL.squish)
      CREATE TYPE reading_list_status AS ENUM ('unread', 'finished');
    SQL
    add_column(:reading_lists, :status, :reading_list_status)
    add_index(:reading_lists, :status)
  end

  def down
    remove_column(:reading_lists, :status)
    execute(<<-SQL.squish)
      DROP TYPE reading_list_status;
    SQL
  end
end
