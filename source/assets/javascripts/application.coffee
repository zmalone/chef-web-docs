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
