xml.instruct!
xml.urlset "xmlns" => "http://www.sitemaps.org/schemas/sitemap/0.9" do
  sitemap.resources.each do |resource|
    xml.url do
      xml.loc "http://#{site_url}#{resource.url}"
      xml.last_mod File.mtime(resource.source_file).xmlschema
      xml.changefreq "weekly"
      xml.priority 0.8
    end if resource.page?
  end
end
