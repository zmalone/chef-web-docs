// Section linking behavior
//
// Makes it so the link icons appear when you mouse over a section heading, and
// disappear when you mouse out of it.
jQuery(function ($) {
  var sectionLinks = $("a.section-link"),
      sectionHeadings = sectionLinks.parents();

  sectionHeadings.on("mouseenter", function (event) {
    sectionLinks.css("visibility", "visible");
  });

  sectionHeadings.on("mouseleave", function (event) {
    sectionLinks.css("visibility", "hidden");
  });

  // Don't hide the link if we mouse out of the link and into its heading
  sectionLinks.on("mouseleave", function (event) {
    if (!$(event.toElement).is($(event.target).parent())) {
      sectionLinks.css("visibility", "hidden");
    }
  });
});
