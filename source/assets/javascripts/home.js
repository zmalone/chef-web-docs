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

  if ($('#sideNav').length) {
    $('#sideNav').scrollToFixed({
      marginTop: 100,
      limit: function() {
        return $('.discussion').offset().top - $('#sideNav').outerHeight() - 20
      },
      removeOffsets: true
    });
  }
});

$('.cls-modal').click(function(){
  $('#SignupModal').foundation('reveal','close')
  $('#loginModal').foundation('reveal','close')
})

$('.video-url').click(function(){
  $('#videoContainer').empty().append('<iframe width="100%" height="480" id="iframe" src="'+$(this).attr('url')+'" frameborder="0" allowfullscreen />')
  $('#videoModal').foundation('reveal','open');
  return false;
})
$('.close-video-modal').on('click', function() {
  $('#videoContainer').html('')
  $('#videoModal').foundation('reveal', 'close');
  return false;
})

$('a.ic-share').click(function() {
  var social_sharers = {
    google: 'https://plus.google.com/share?url=',
    facebook: 'https://www.facebook.com/sharer/sharer.php?u=',
    twitter: 'https://twitter.com/intent/tweet?text=&url=',
    linkedin: 'https://www.linkedin.com/shareArticle?mini=true&title=&summary=&url='
  }
  var page_key = $(this).attr('href');

  $.each( social_sharers, function( key, value ) {
    $('#socialShare .modal-body p.social').append('<a class="fa fa-'+
      key+'" href="'+value+page_key+'" target="_blank" />');
  });
  $('#socialShare').foundation('reveal', 'open');
});
