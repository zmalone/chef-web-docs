$ ->
  $.ajax
    url: "#{document.location.protocol}//munchkin.marketo.net/munchkin.js"
    dataType: 'script'
    cache: true
    success: ->
      Munchkin.init '255-VFB-268'
