# frozen_string_literal: true

class AddRelationFirmAccount < ActiveRecord::Migration[7.0]
  def change
    add_reference :accounts, :firm, index: true, foreign_key: true
  end
end
