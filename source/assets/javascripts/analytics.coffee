class Analytics
  constructor: (account_id, domain_name) ->
    window._gaq ?= []
    window._gaq.push ['_setAccount', account_id]
    window._gaq.push ['_setDomainName', domain_name]
    window._gaq.push ['_trackPageview', domain_name]

    addScript()

  # Triggered when the user indicates he/she has successfully converged the node.
  successfulConverge: ->
    window._gaq.push ['_trackEvent', 'Converges', 'Successful', 'Successful converge']

  # Triggered when the user indicates he/she has not successfully converged the node.
  failedConverge: ->
    window._gaq.push ['_trackEvent', 'Converges', 'Failed', 'Failed converge']

  addScript = ->
    ga = document.createElement("script")
    ga.type = "text/javascript"
    ga.async = true
    ga.src = ((if "https:" is document.location.protocol then "https://ssl" else "http://www")) + ".google-analytics.com/ga.js"
    s = document.getElementsByTagName("script")[0]
    s.parentNode.insertBefore ga, s
    true

@Analytics = new Analytics('UA-6369228-7', 'opscode.com')