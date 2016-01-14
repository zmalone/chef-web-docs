module ModalHelpers
  def reveal_modal(id, title, &block)
    concat(
      link_to(title, '#', class: 'help-button radius', 'data-reveal-id' => id)
    )
    concat(
      content_tag(:div, {id: id, class: 'reveal-modal', "data-reveal" => '', 'aria-labelledby' => "modalTitle", 'aria-hidden' => "true", role: "dialog"}, false) do
        output = []
        output << capture(&block)
        output << content_tag(:a, class: "close-reveal-modal", "aria-label" => "Close") do
          "&#215;"
        end
        output.join
      end
    )
  end
end
