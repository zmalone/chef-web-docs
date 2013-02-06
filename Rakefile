require 'fileutils'

require './lib/markdown'

require 'bundler/setup'
require 'pdfkit'

desc 'Build application PDFs'
task :build do
  FileUtils.rm_rf('./build')
  FileUtils.mkdir_p('./build')

  options = {
    header_line: true,
    header_left: 'Chef Quick Start Guide',
    header_right: "Prepared on #{Time.now.strftime('%x')}",
    header_spacing: 5,
    header_font_size: 8
  }

  Dir['source/**/*.md'].each do |file|
    kit = ::PDFKit.new Markdown.parse(File.read(file)), options
    kit.stylesheets << 'source/assets/style.css'

    new_path = File.expand_path(file).sub('/source', '/build').gsub('.md', '.pdf')
    FileUtils.mkdir_p new_path.split('/')[0...-1].join('/')

    kit.to_file new_path

    puts "[INFO] Successfully built '#{file}'"
  end
end
