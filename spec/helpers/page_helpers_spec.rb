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
        remaining: [130, 310],
        modules: ['manage-a-node'],
        parent: 'tracks'
      }
    end

    let(:module_name) { 'manage-a-node' }
    let(:module_json) do
      {
        url: '/modules/manage-a-node-chef-server',
        remaining: [130, 310],
        is_fork: true,
        parent: 'modules',
        children: ['manage-a-node/rhel', 'manage-a-node/ubuntu', 'manage-a-node/windows']
      }
    end

    let(:page_name) { 'manage-a-node/rhel/automate/bootstrap-your-node' }
    let(:page_json) do
      {
        url: '/modules/manage-a-node-chef-server/rhel/automate/bootstrap-your-node',
        remaining: [20, 20],
        minutes: [20, 20],
        parent: 'manage-a-node/rhel/automate'
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

  let(:module_id) { 'manage-a-node' }
  let(:module_path) { '/modules/manage-a-node-chef-server/rhel/automate/index.html' }
  let(:module_page) { helper.sitemap.find_resource_by_path(module_path) }

  let(:module_sans_track) { double('test-module', id: 'test-module-not-in-a-track') }

  let(:track_id) { 'infrastructure-automation' }
  let(:track_path) { '/tracks/infrastructure-automation/index.html' }
  let(:track_page) { helper.sitemap.find_resource_by_path(track_path) }

  describe '.get_module' do
    it 'returns the root module tree object' do
      expect(helper.get_module(module_page).id).to eq module_id
    end
  end

  describe '.get_track' do
    it 'returns the current track for a track page' do
      expect(helper.get_track(track_page).id).to eq track_id
    end

    it 'returns the current track for a module page' do
      expect(helper.get_track(module_page).id).to eq track_id
    end

    context 'when a module is not in any tracks' do
      it 'returns nil and logs a warning' do
        expect_any_instance_of(PageHelper).to receive(:get_module).and_return(module_sans_track)

        expect(helper.logger).to receive(:warn).once
        expect(helper.get_track(module_page)).to be_nil
      end
    end
  end

  describe '.get_current_breadcrumbs' do
    it 'returns 3 levels for a unit page' do
      expect(helper.get_current_breadcrumbs(module_page).size).to eq 3
    end

    it 'returns 1 level for a track page' do
      expect(helper.get_current_breadcrumbs(track_page).size).to eq 1
    end

    context 'when a module is not in any tracks' do
      it 'returns nil and logs a warning' do
        allow_any_instance_of(PageHelper).to receive(:get_module).and_return(module_sans_track)

        expect(helper.logger).to receive(:warn).at_least(:once)
        expect(helper.get_current_breadcrumbs(module_page)).to be_empty
      end
    end
  end

  describe '.find_next_page' do
    let(:lone_module_page) { '/modules/be-a-secure-chef/index.html' }
    let(:module_path_overview) { '/modules/manage-a-node-chef-server/index.html' }
    let(:module_path_multipage_1) { '/modules/manage-a-node-chef-server/rhel/index.html' }
    let(:module_path_multipage_2) { '/modules/manage-a-node-chef-server/rhel/hosted/index.html' }
    let(:module_path_unitpage_1) { '/modules/manage-a-node-chef-server/rhel/hosted/set-up-your-workstation/index.html' }
    let(:module_path_unitpage_2) { '/modules/manage-a-node-chef-server/rhel/hosted/set-up-your-chef-server/index.html' }

    it 'returns the first multipage from the module overview' do
      page1 = helper.sitemap.find_resource_by_path(module_path_overview)
      page2 = helper.sitemap.find_resource_by_path(module_path_multipage_1)
      expect(helper.find_next_page(page1).page.path).to eq page2.path
    end

    it 'returns the next multipage from the first multipage' do
      page1 = helper.sitemap.find_resource_by_path(module_path_multipage_1)
      page2 = helper.sitemap.find_resource_by_path(module_path_multipage_2)
      expect(helper.find_next_page(page1).page.path).to eq page2.path
    end

    it 'returns the first unit page from the last multipage' do
      page1 = helper.sitemap.find_resource_by_path(module_path_multipage_2)
      page2 = helper.sitemap.find_resource_by_path(module_path_unitpage_1)
      expect(helper.find_next_page(page1).page.path).to eq page2.path
    end

    it 'returns the second unit page from the first unit page' do
      page1 = helper.sitemap.find_resource_by_path(module_path_unitpage_1)
      page2 = helper.sitemap.find_resource_by_path(module_path_unitpage_2)
      expect(helper.find_next_page(page1).page.path).to eq page2.path
    end

    it 'does not return a next page for a lone top-level module page' do
      page = helper.sitemap.find_resource_by_path(lone_module_page)
      expect(helper.find_next_page(page)).to be_nil
    end
  end
end
