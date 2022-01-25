class User < ApplicationRecord
  include AASM

  validates :email, presence: true unless :phone
  validates :phone, presence: true unless :email

  aasm column: :status do
    state :inactive, initial: true
    state :active
    state :disabled
    event :activate do
      transitions from: [:inactive], to: :active, after: Proc.new { activate! }
      transitions from: [:disabled], to: :active
    end
  end

  def send_confirmation_code!(code = nil)
    code ||= rand.to_s[2..6]

    self.confirmation_code = code
    self.last_try = DateTime.now
    save!
  end

  def activate!
    self.confirmation_code = nil
    self.last_try = DateTime.now
    self.confirmed_at = DateTime.now
    save!
  end
end
