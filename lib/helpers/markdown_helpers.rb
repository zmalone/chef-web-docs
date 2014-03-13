module MarkdownHelpers
  include Redcarpet

  # Make it so you can put Markdown anywhere in a block like:
  #
  #     <% markdown do %>
  #     # My markdown is here
  #
  #     *Hooray!*
  #     <% end %>
  #
  def markdown(&block)
    concat(Markdown.new(Render::HTML, autolink: true).render(capture(&block)))
  end
end
