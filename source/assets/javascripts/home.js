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
  var ANIMATION_DURATION = 685
  var ANIMATION_OFFSET = 162

  $("div.module-hide").slice(0, SHOW_MODULE).show();
  $("div.track-hide").slice(0, SHOW_TRACK).show();
  $(".module-load-more").on('click', function (e) {
    e.preventDefault();
    if (SHOW_MODULE >= $("div.module-hide:hidden").length) {
      $(".load-module").fadeOut('slow');
    }
    $("div.module-hide:hidden").slice(0, SHOW_MODULE).each(function(index) {
      $(this).delay(ANIMATION_OFFSET * index).fadeIn({
        duration: ANIMATION_DURATION,
        easing: 'linear'
      });
    });
  });
  $(".track-load-more").on('click', function (e) {
    e.preventDefault();
    if (SHOW_TRACK >= $("div.track-hide:hidden").length) {
      $(".load-track").fadeOut('slow');
    }
    $("div.track-hide:hidden").slice(0, SHOW_TRACK).each(function(index) {
      $(this).delay(ANIMATION_OFFSET * index).fadeIn({
        duration: ANIMATION_DURATION,
        easing: 'linear'
      });
    });
  });
  // if ($('#sideNav').length) {
  //   $('#sideNav').scrollToFixed({ marginTop: 100, limit: $($('.module-next-btn')).offset().top });
  // }
});
$('.cls-modal').click(function(){
    $('#SignupModal').foundation('reveal','close')
    $('#loginModal').foundation('reveal','close')
})

$('.video-url').click(function(){
  $('#videoContainer').append('<iframe width="100%" height="480" id="iframe" src="'+$(this).attr('url')+'" frameborder="0" allowfullscreen />')
  $('#videoModal').foundation('reveal','open');
  return false;
})
$('.close-video-modal').on('click', function() {
  $('#videoContainer').html('')
  $('#videoModal').foundation('reveal', 'close');
  return false;
});

