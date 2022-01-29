require "rails_helper"

RSpec.describe User, type: :model do
  describe "create user from scratch" do
    let (:user) { create(:user) }
    let (:primary_method) { "phone" }
    subject { user.send_confirmation_code!(primary: primary_method) }

    shared_examples :sign_in do
      it "sending confirmation code" do
        expect(user.confirmation_code).to be(nil)
        expect(user.last_try).to be(nil)
        expect(user.status).to eq('inactive')
        subject
        expect(user.confirmation_code.length).to be(5)
      end

      it "activation" do
        subject
        expect(user.confirmation_code.length).to be(5)
        user.activate!(code: user.confirmation_code)
        expect(user.confirmation_code).to be(nil)
        expect(user.status).to eq('active')
      end
    end

    context "by email" do
      let (:user) { create(:user, email: "example@example.com") }
      let (:primary_method) { "email" }
      include_examples :sign_in
    end

    context "by phone" do
      let (:user) { create(:user, phone: "+79999999999") }
      let (:primary_method) { "phone" }
      include_examples :sign_in
    end
  end
end