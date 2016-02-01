module PathHelpers
  def file_path(path)
    concat(
      content_tag(:code, class: 'file-path') do
        path
      end
    )
  end
  
  alias :fp :file_path
end
