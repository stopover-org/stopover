# frozen_string_literal: true

require 'rails_helper'

RSpec.shared_examples :include_metadata do
  it 'metadata will be created' do
    expect { subject }.to change { SeoMetadatum.count }.by(1)
  end
end
