$(document).ready(function() {
   var
     meter = $("span.meter"),
     lerp = function(a, b, percent) {
       return a + (percent * (b - a));
     };

   meter.delay(333).animate({
     width:meter.attr("data-extend-width"),
     opacity: lerp(parseFloat(meter.attr("data-min-opacity")), 1.0, parseInt(meter.attr("data-target-width")) * 0.01)
   }, {
     easing: "swing", 
     duration: meter.attr("data-duration-1"),
     done: function() {
       var meter = $("span.meter");
       meter.animate({
         width:meter.attr("data-target-width")
       }, {
         easing: "swing",
         duration: meter.attr("data-duration-2")
       });
     }
   });
});