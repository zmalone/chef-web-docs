// Make the sidebar root links clickable
$('.accordion').on('click', '.title a', function (event) {
  window.location.assign(event.currentTarget.href);
});

(function() {
  var sidebar = $('#sidebar');
  var headerHeight = $('#header').height();
  var initialContentOffset = $('section.row').offset().top;

  function repositionSidebar() {
    var top = $(window).scrollTop();
    if(top > headerHeight) {
      sidebar.css("top", initialContentOffset - headerHeight);
    } else {
      sidebar.css("top", -1 * top + initialContentOffset);
    }
  }

  // Run when the DOM is ready
  $(document).on('ready', repositionSidebar);

  // Makes the sidebar slide along with the content while the window scrolls.
  $(window).on('scroll', repositionSidebar);
}());

// As of August 22, 2014, Foundation's accordion feature appears to have
// problems in Foundation 5. This workaround uses jQuery to control the viewing
// of sidebar sections and only shows "open" sections while a user is actively
// in the section itself.
$('#sidebar nav .accordion').ready(function() {
  $('.section-container section .content').hide();
  $('.section-container section.active .content').show();
});
