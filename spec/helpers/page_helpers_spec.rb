require 'spec_helper'
# require_relative '../../helpers/page_helper'

describe PageHelper do
  subject(:helper) { Object.new.extend(PageHelper) }

  before(:each) do
    allow(helper).to receive(:sitemap).and_return(MM_TEST_APP.sitemap)
    allow(helper).to receive(:logger).and_return(MM_TEST_APP.logger)
  end

  it 'can access the sitemap' do
    expect(helper.sitemap).to_not be_nil
  end

  describe '.get_tree_data' do
    let(:track_name) { 'infrastructure-automation' }
    let(:track_json) do
      {
        url: '/modules/manage-a-node',
        minutes: 300..500,
        children: ['/modules/manage-a-node/rhel/']
      }
    end

    let(:module_name) { 'manage-a-node' }
    let(:module_json) do
      {
        url: "/modules/manage-a-node",
        minutes: 300..500,
        children: ['/modules/manage-a-node/rhel/']
      }
    end

    let(:tree_data) { helper.get_tree_data }

    it 'has known track' do
      expect(tree_data['tracks'][trackname]).to eq track_json
    end

    it 'has known module' do
      expect(tree_data['modules'][module_name]).to eq module_json
    end

    it 'has known page' do
      expect(tree_data['modules'][page_name]).to eq page_json
    end
  end


  describe '.get_sitemap_path' do
    it 'strips trailing file extensions' do
      expect(helper.get_sitemap_path('/some/path/index.html.md.erb')).to eq '/some/path/index.html'
    end

    it 'strips trailing file extensions (even when not html)' do
      expect(helper.get_sitemap_path('index.erb.html.another')).to eq 'index.erb'
    end

    it 'returns nil for partial' do
      expect(helper.get_sitemap_path('/_index.erb')).to be_nil
    end
  end

  describe '.find_page_by_path' do
    let(:page) { 'modules/manage-a-node/index.html.md.erb' }

    it 'returns existing page' do
      expect(helper.find_page_by_path(page)).to_not be_nil
    end

    it 'returns nil for an unknown page' do
      expect(helper.find_page_by_path('/some/path/unknown.html.md.erb')).to be_nil
    end
  end
end
