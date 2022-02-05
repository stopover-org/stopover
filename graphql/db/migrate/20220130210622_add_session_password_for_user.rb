# frozen_string_literal: true

class AddSessionPasswordForUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :session_password, :string
  end
end
