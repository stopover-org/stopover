# frozen_string_literal: true

class AddStatusToEvents < ActiveRecord::Migration[7.0]
  def change
    add_column :events, :status, :string
  end
end
