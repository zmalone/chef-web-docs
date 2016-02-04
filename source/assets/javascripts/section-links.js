// Section linking behavior
//
// Makes it so the link icons appear when you mouse over a section heading, and
// disappear when you mouse out of it.
jQuery(function ($) {
  var sectionLinks = $("span.section-links"),
      sectionHeadings = sectionLinks.parent();

  sectionHeadings.on("mouseenter", function (event) {
    $(event.delegateTarget).children().css("visibility", "visible");
  });

  sectionHeadings.on("mouseleave", function (event) {
    $(event.delegateTarget).children().css("visibility", "hidden");
  });
});
