# We embellish <code> tags semantically. For example, we want to use different colors
# to indicate paths/filenames and placeholder text from normal `code`.
# These helpers make it easier to write <code> tags.
module InlineCodeHelpers
  def file_path(path)
    emit_code_tag path, 'file-path'
  end
  
  def placeholder(text)
    emit_code_tag text, 'placeholder'
  end
  
  alias :fp :file_path
  alias :ph :placeholder
  
  private
  
  def emit_code_tag(text, css_class)
    concat(
      content_tag(:code, class: css_class) do
        text.gsub(/_/, '\_').gsub(/\\\\_/, '\_')
      end
    )
  end
end
