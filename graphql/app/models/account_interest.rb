class AccountInterest < ApplicationRecord
  belongs_to :account, optional: false
  belongs_to :interest, optional: false
end
