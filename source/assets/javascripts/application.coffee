#= require jquery
#= require foundation

#= require analytics
#= require munchkin

$ ->
  $(document).foundation()

$ ->
  $window = $(window)
  $sidebar = $('#sidebar')
  elTop = $sidebar.offset().top - 25

  #$window.scroll ->
  #  $sidebar.css
  #    width: $sidebar.outerWidth()
  #  $sidebar.toggleClass('sticky', $window.scrollTop() > elTop)

  #$window.resize ->
  #  $sidebar.css
  #    width: ''

console.log navigator.appVersion

$ ->
  $("a.workstation-setup:contains('Windows')").click() if navigator.appVersion.indexOf("Win") != -1
  $("a.workstation-setup:contains('Mac')").click() if navigator.appVersion.indexOf("Macintosh") != -1
  $("a.workstation-setup:contains('Linux')").click() if navigator.appVersion.indexOf("X11") != -1

