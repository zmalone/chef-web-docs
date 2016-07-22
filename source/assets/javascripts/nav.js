$(document).ready(function() {
  // Nav Interactions
  const $navLinks = $(".nav-links");
  const navBreakpoint = 714; // navBreakpoint should be the same as breakpoint in _nav.scss file
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

  // Add Active State to Nav for Sub-pages
  var currentUrl = location.pathname;
  var $navLink = $(".nav-link");
  var linkUrl, learnCategory;
  var tutorialsLink, skillsLink;

  if (layoutCategory.search("lesson") >= 0) {
    learnCategory = "tutorials";
  } else if (layoutCategory.search("skills") >= 0) {
    learnCategory = "skills";
  }

  $navLink.each(function() {
    var $this = $(this);
    linkUrl = $this.find("a").attr("href");

    tutorialsLink = linkUrl.search("tutorials") >= 0;
    skillsLink = linkUrl.search("skills") >= 0;

    if ((currentUrl === linkUrl) || 
      (tutorialsLink && learnCategory === "tutorials") || 
      (skillsLink && learnCategory === "skills")) {

      $(".nav-link.is-active").removeClass("is-active");
      $this.addClass("is-active");
    }
  });

});
