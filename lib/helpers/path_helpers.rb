module PathHelpers
  def file_path(path)
    concat(
      content_tag(:code, class: 'file-path') do
        path.gsub(/_/, '\_').gsub(/\\\\_/, '\_')
      end
    )
  end
  
  alias :fp :file_path
end
