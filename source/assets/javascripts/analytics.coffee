class Analytics
  constructor: (account_id, domain_name, gaq) ->
    @gaq = gaq
    @gaq.push ['_setAccount', account_id]
    @gaq.push ['_setDomainName', domain_name]
    @gaq.push ['_trackPageview', domain_name]

    add_script()

  # Triggered when the user indicates he/she has successfully converged the node.
  successful_converge: ->
    @gaq.push ['_trackEvent', 'Converges', 'Success', 'Successful converge']

  # Triggered when the user indicates he/she has not successfully converged the node.
  failed_converge: ->
    @gaq.push ['_trackEvent', 'Converges', 'Fail', 'Failed converge']

  add_script = ->
    ga = document.createElement("script")
    ga.type = "text/javascript"
    ga.async = true
    ga.src = ((if "https:" is document.location.protocol then "https://ssl" else "http://www")) + ".google-analytics.com/ga.js"
    s = document.getElementsByTagName("script")[0]
    s.parentNode.insertBefore ga, s

# Make the gaq object global so ga.js can read it.
#
# http://stackoverflow.com/questions/4214731/coffeescript-global-variables
root = exports ? this
root._gaq ||= []

@Analytics = new Analytics('UA-6369228-7', 'opscode.com', root._gaq)