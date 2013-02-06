require 'fileutils'

require './lib/markdown'

require 'bundler/setup'
require 'pdfkit'

desc 'Build application PDFs'
task :build do
  FileUtils.rm_rf('./build')
  FileUtils.mkdir_p('./build')

  # Copy over assets
  FileUtils.cp_r('./source/assets', './build/assets')

  options = {
    header_line: true,
    header_left: 'Chef Quick Start Guide',
    header_right: "Build ##{Time.now.to_i}",
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

  # Dir['source/**/*.md'].each do |file|
  #   contents = Markdown.parse(File.read(file))

  #   p contents.class

  #   new_path = File.expand_path(file).sub('/source', '/build').gsub('.md', '.html')
  #   FileUtils.mkdir_p new_path.split('/')[0...-1].join('/')

  #   File.open(new_path, 'w') do |f|
  #     f.write contents
  #   end

  #   puts "[INFO] Successfully built '#{new_path}'"
  # end
end
