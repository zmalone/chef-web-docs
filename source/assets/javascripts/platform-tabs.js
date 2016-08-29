$(function() {
  $('a.platform-tab').on('click', function(event){
    // Highlight the selected option.
    $(this).parent().parent().find("a.platform-tab").removeClass("highlight-platform").addClass("hoverable-platform");
    $(this).removeClass("hoverable-platform").addClass("highlight-platform");

    var target = 'learn_the_basics_' + $(this).data('platform');
    $("#"+target).show().siblings("div").hide();

    $('p#learn_the_basics_select_server_platform').hide();
    $('p#learn_the_basics_select_virtualization_platform').show();

    event.preventDefault(); // Prevent link from following its href
    //id="learn_the_basics_rhel"
     //var target = $(this).attr('rel');
     //$("#"+target).show().siblings("div").hide();
  });

  $('a.hide-help-content').on('click', function(event){
    var target = $(this).data('target');
    $("#"+target).slideUp(400, function() {
      $(this).siblings("a").filter(".show-help-content").show();
    });
    event.preventDefault(); // Prevent link from following its href
  });

  $('a.show-help-content').on('click', function(event){
    var target = $(this).data('target');
    __this = $(this);
    $("#"+target).slideDown(400, function() {
      __this.hide();
    });
    event.preventDefault(); // Prevent link from following its href
  });
});

//
// $( "div" )
//   .css( "background", "#c8ebcc" )
//   .filter( ".middle" )
//     .css( "border-color", "red" );
