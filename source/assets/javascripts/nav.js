$(document).ready(function() { 
  // Nav Interactions
  const $navLinks = $(".nav-links");
  const navBreakpoint = 620; // navBreakpoint should be the same as breakpoint in _nav.scss file
  var largeScreen;

  var checkWindowSize = function() {
    windowWidth = $(window).width();

    if (windowWidth > navBreakpoint) {
      largeScreen = true;
      $navLinks.css("display", "block");
    } else {
      largeScreen = false;
      $navLinks.css("display", "");
    }
  }

  checkWindowSize();

  $(window).resize(function () {
    checkWindowSize();
  });

  $("#nav-icon").click(function () {
    if (!largeScreen) {
      if ($navLinks.hasClass("is-open")) {
        $navLinks.removeClass("is-open");
        $navLinks.slideUp();
      } else {
        $navLinks.addClass("is-open");
        $navLinks.slideDown();
      }
    }
  });

});
