require_relative '../../lib/helpers/feature_helpers'

describe FeatureHelpers do
  subject(:helper) { Object.new.extend(FeatureHelpers) }

  before :each do
    stub_const 'ENV', 'FEATURES' => 'a_feature', 'PROVISIONER' => 'a_provisioner'
  end

  describe 'feature? method' do
    subject(:the_feature_test) { helper.feature?(:a_feature) }

    context 'when FEATURES is not defined' do
      it 'always returns false' do
        ENV.delete('FEATURES')
        expect(the_feature_test).to be_falsey
      end
    end

    context 'when FEATURES is malformed' do
      it 'always returns false' do
        ENV['FEATURES'] = 'ruby is; awesome, 7'
        expect(the_feature_test).to be_falsey
      end
    end

    context 'when FEATURES defines only one feature' do
      it 'returns true for that feature' do
        expect(the_feature_test).to be_truthy
      end
    end

    context 'when FEATURES defines multiple features' do
      it 'returns true for any feature' do
        ENV['FEATURES'] = 'a_feature,another_feature, a_third_feature_with_a_leading_space'
        expect(the_feature_test).to be_truthy
      end
    end
  end

  describe 'provisioner method' do
    subject(:the_provisioner) { helper.provisioner }

    context 'when PROVISIONER is not defined' do
      it 'returns "skytap"' do
        ENV.delete('PROVISIONER')
        expect(the_provisioner).to eq('skytap')
      end
    end

    context 'when PROVISIONER is defined' do
      it 'returns the specified provisioner' do
        expect(the_provisioner).to eq('a_provisioner')
      end
    end
  end
end
