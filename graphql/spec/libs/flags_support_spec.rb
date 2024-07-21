# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Stopover::FlagsSupport do
  describe '.disable_phone_validation' do
    context 'when skip is true' do
      it 'calls disable_flag method with :skip_phone_validation flag' do
        skip = true
        block = proc { 'test_proc' }

        expect(Stopover::FlagsSupport).to receive(:disable_flag).with(:skip_phone_validation, &block)
        Stopover::FlagsSupport.disable_phone_validation(skip: skip, &block)
      end
    end

    context 'when skip is not true' do
      it 'does not call disable_flag method' do
        skip = false
        block = proc { 'test_proc' }

        expect(Stopover::FlagsSupport).not_to receive(:disable_flag)
        Stopover::FlagsSupport.disable_phone_validation(skip: skip, &block)
      end
    end
  end

  describe '.skip_notifications' do
    context 'when skip is true' do
      it 'calls disable_flag method with :skip_notifications_delivery flag' do
        skip = true
        block = proc { 'test_proc' }

        expect(Stopover::FlagsSupport).to receive(:disable_flag).with(:skip_notifications_delivery, &block)
        Stopover::FlagsSupport.skip_notifications(skip: skip, &block)
      end
    end

    context 'when skip is not true' do
      it 'does not call disable_flag method' do
        skip = false
        block = proc { 'test_proc' }

        expect(Stopover::FlagsSupport).not_to receive(:disable_flag)
        Stopover::FlagsSupport.skip_notifications(skip: skip, &block)
      end
    end
  end

  describe '.skip_stripe_integrations' do
    context 'when skip is true' do
      it 'calls disable_flag method with :skip_stripe_integration flag' do
        skip = true
        block = proc { 'test_proc' }

        expect(Stopover::FlagsSupport).to receive(:disable_flag).with(:skip_stripe_integration, &block)
        Stopover::FlagsSupport.skip_stripe_integrations(skip: skip, &block)
      end
    end

    context 'when skip is not true' do
      it 'does not call disable_flag method' do
        skip = false
        block = proc { 'test_proc' }

        expect(Stopover::FlagsSupport).not_to receive(:disable_flag)
        Stopover::FlagsSupport.skip_stripe_integrations(skip: skip, &block)
      end
    end
  end
end
