require 'spec_helper'
# require_relative '../../helpers/page_helper'

describe PageHelper do
  subject(:helper) { Object.new.extend(PageHelper) }

  before(:each) do
    # Add extension helpers to context.
    MM_TEST_APP.extensions.add_exposed_to_context(helper)

    allow(helper).to receive(:sitemap).and_return(MM_TEST_APP.sitemap)
    allow(helper).to receive(:data).and_return(MM_TEST_APP.data) # middleman-navtree data
    allow(helper).to receive(:logger).and_return(MM_TEST_APP.logger)
  end

  it 'can access the sitemap' do
    expect(helper.sitemap).to_not be_nil
  end

  describe '.get_tree_data' do
    let(:track_name) { 'infrastructure-automation' }
    let(:track_json) do
      {
        url: '/tracks/infrastructure-automation',
        remaining: [185, 415],
        modules: ['how-to-learn-chef', 'learn-the-basics', 'manage-a-node']
      }
    end

    let(:module_name) { 'manage-a-node' }
    let(:module_json) do
      {
        url: '/modules/manage-a-node',
        remaining: [130, 310],
        is_fork: true,
        children: ['manage-a-node/rhel', 'manage-a-node/ubuntu', 'manage-a-node/windows']
      }
    end

    let(:page_name) { 'manage-a-node/rhel/automate/bootstrap-your-node' }
    let(:page_json) do
      {
        url: '/modules/manage-a-node/rhel/automate/bootstrap-your-node',
        remaining: [20, 20],
        minutes: [20, 20]
      }
    end

    let(:tree_data) { helper.get_tree_data }

    it 'has track data' do
      expect(tree_data[:tracks]).to be_an_instance_of(Hash)
    end

    it 'has module data' do
      expect(tree_data[:modules]).to be_an_instance_of(Hash)
    end

    it 'has known track' do
      expect(tree_data[:tracks][track_name]).to eq track_json
    end

    it 'has known module' do
      expect(tree_data[:modules][module_name]).to eq module_json
    end

    it 'has known page' do
      expect(tree_data[:modules][page_name]).to eq page_json
    end
  end

  describe '.get_module' do
    let(:module_id) { 'manage-a-node' }
    let(:module_child_path) { '/modules/manage-a-node/rhel/automate/index.html' }
    let(:module_child_page) { helper.sitemap.find_resource_by_path(module_child_path) }

    it 'returns the root module tree object' do
      expect(helper.get_module(module_child_page).id).to eq module_id
    end
  end

  describe '.get_track' do
    let(:track_id) { 'infrastructure-automation' }
    let(:track_path) { '/tracks/infrastructure-automation/index.html' }
    let(:track_page) { helper.sitemap.find_resource_by_path(track_path) }
    let(:module_child_path) { '/modules/manage-a-node/rhel/automate/index.html' }
    let(:module_child_page) { helper.sitemap.find_resource_by_path(module_child_path) }

    it 'returns the current track for a track page' do
      expect(helper.get_track(track_page).id).to eq track_id
    end

    it 'returns the current track for a module page' do
      expect(helper.get_track(module_child_page).id).to eq track_id
    end
  end
end
