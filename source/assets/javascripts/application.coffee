#= require jquery
#= require foundation

#= require analytics
#= require munchkin
#= require section-links

$ ->
  $(document).foundation()

$ ->
  $("a.workstation-setup:contains('Windows')").click() if navigator.appVersion.indexOf("Win") != -1
  $("a.workstation-setup:contains('Mac')").click() if navigator.appVersion.indexOf("Macintosh") != -1
  $("a.workstation-setup:contains('Linux')").click() if navigator.appVersion.indexOf("X11") != -1
