class SnapEngage
  constructor: (account_id, domain_name) ->
    se = document.createElement("script")
    se.type = "text/javascript"
    se.async = true
    se.src = "//commondatastorage.googleapis.com/code.snapengage.com/js/d7080c48-7bef-45a3-950f-923423d9af2b.js"
    s = document.getElementsByTagName("script")[0]
    s.parentNode.insertBefore se, s
    true

new SnapEngage()
