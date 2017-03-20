require 'spec_helper'

describe Middleman::Sitemap do
  subject(:app) { MM_TEST_APP }

  before(:each) do
    # Add extension helpers to context.
    MM_TEST_APP.extensions.add_exposed_to_context(app)

    allow(app).to receive(:data).and_return(MM_TEST_APP.data)
    allow(app).to receive(:logger).and_return(MM_TEST_APP.logger)
  end

  it 'can access the sitemap' do
    expect(app.sitemap).to_not be_nil
  end

  describe 'sitemap resource helper methods' do
    let(:module_path) { '/modules/manage-a-node/index.html' }
    let(:module_id) { 'manage-a-node' }
    let(:module_page) { app.sitemap.find_resource_by_path(module_path) }

    it '.id' do
      expect(module_page.id).to eq module_id
    end
  end

end
