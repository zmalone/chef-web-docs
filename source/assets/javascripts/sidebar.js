// Make the sidebar root links clickable
$('.accordion').on('click', '.title a', function (event) {
  window.location.assign(event.currentTarget.href);
});

var HEADER_HEIGHT = 92;
var INITIAL_SIDEBAR_OFFSET = 112;

// Makes the sidebar slide along with the content while the window scrolls.
$(window).scroll(function() {
  var top = $(window).scrollTop();
  if(top > HEADER_HEIGHT) {
    $('#sidebar').css("top", INITIAL_SIDEBAR_OFFSET - HEADER_HEIGHT);
  } else {
    $('#sidebar').css("top", -1 * $(window).scrollTop() + INITIAL_SIDEBAR_OFFSET);
  }
});
