$(document).ready(function() {
  var $titles = $(".home--section--title");
  var $description = $(".home--descriptions");

  $titles.hover(
    function() {
      $titles.find(".home--section--icon").removeClass("fade-in");

      if ($(window).width() > 800) {
        var $this = $(this);

        if ( $(this).parents('[data-section="tutorials"]').length)  {
          $description.removeClass("skills-active docs-active training-active community-active")
            .addClass("tutorials-active");

        } else if ( $(this).parents('[data-section="skills"]').length) {
          $description.removeClass("tutorials-active docs-active training-active community-active")
            .addClass("skills-active");

        } else if ( $(this).parents('[data-section="docs"]').length) {
          $description.removeClass("skills-active tutorials-active training-active community-active")
            .addClass("docs-active");

        } else if ( $(this).parents('[data-section="training"]').length) {
          $description.removeClass("skills-active docs-active tutorials-active community-active")
            .addClass("training-active");
        } else if ( $(this).parents('[data-section="community"]').length) {
          $description.removeClass("skills-active docs-active tutorials-active training-active")
            .addClass("community-active");
        }
      }
  }, function() {

  });

  var SHOW_MODULE = 16
  var SHOW_TRACK = 10

  $("div.module-hide").slice(0, SHOW_MODULE).show();
  $("div.track-hide").slice(0, SHOW_TRACK).show();
  $(".module-load-more").on('click', function (e) {
    e.preventDefault();
    $("div.module-hide:hidden").slice(0, SHOW_MODULE).each(function(index) {
      $(this).delay(500*index).fadeIn(300);
    });
    if ($("div.module-hide:hidden").length == 0) {
      $(".load-module").fadeOut('slow');
    }
  });
  $(".track-load-more").on('click', function (e) {
    e.preventDefault();
    $("div.track-hide:hidden").slice(0, SHOW_TRACK).each(function(index) {
      $(this).delay(400*index).fadeIn(300);
    });
    if ($("div.track-hide:hidden").length == 0) {
      $(".load-track").fadeOut('slow');
    }
  });

});
$('.cls-modal').click(function(){
    $('#SignupModal').foundation('reveal','close')
    $('#loginModal').foundation('reveal','close')
})



