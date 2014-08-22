// Make the sidebar root links clickable
$('.accordion').on('click', '.title a', function (event) {
  window.location.assign(event.currentTarget.href);
});

(function() {
  var sidebar = $('#sidebar');
  var headerHeight = $('#header').height();
  var initialContentOffset = $('section.row').offset().top;

  // Makes the sidebar slide along with the content while the window scrolls.
  $(window).scroll(function() {
    var top = $(window).scrollTop();
    if(top > headerHeight) {
      sidebar.css("top", initialContentOffset - headerHeight);
    } else {
      sidebar.css("top", -1 * top + initialContentOffset);
    }
  });
}());
