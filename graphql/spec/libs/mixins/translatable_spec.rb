# frozen_string_literal: true

RSpec.shared_examples :translatable_spec do |klass|
  before do
    Flipper.enable(:global_translations)
  end

  teardown do
    Flipper.disable(:global_translations)
  end
  context "on create #{klass}" do
    it 'translate' do
      model = nil
      expect { model = subject }.to change { DynamicTranslation.where(translatable_type: klass.to_s).count }.by(klass::TRANSLATABLE_FIELDS.size)
      expect(DynamicTranslation.where(translatable_type: klass.to_s, translatable_id: model.id, target_language: model.language).count).to eq(0)
    end
  end

  context "on update #{klass}" do
    klass::TRANSLATABLE_FIELDS.each do |field|
      it "translate #{field}" do
        model = subject
        expect_any_instance_of(DynamicTranslation).to receive(:refresh).and_call_original
        model.update!(field => 'new value')
      end
    end
  end

  it 'change_language' do
    model = subject
    expect { model.update!(language: 'ru') }.to change { DynamicTranslation.where(translatable_type: klass.to_s).count }.by(klass::TRANSLATABLE_FIELDS.size)
  end
end
