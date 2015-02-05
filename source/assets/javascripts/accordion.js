$('.accordion .accordion-navigation').ready(function() {
  $('.accordion .accordion-navigation').on('click', function() {
    $(this).children().last().toggle();
  });
});
