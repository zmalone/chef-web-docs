var hasHref = function (linkURL) {
  return linkURL == undefined ? true : false;
}

var isAbsoluteLink = function (linkURL) {
  return linkURL.indexOf("/") != 0;
}

var isDifferentHostname = function (linkURL) {
  return linkURL.indexOf(location.hostname) < 0;
}

var isFragmentLink = function(linkURL) {
  return linkURL.indexOf("#") != 0;
}

var isOutboundLink = function(linkURL) {
  return isAbsoluteLink(linkURL) && isDifferentHostname(linkURL) && isFragmentLink(linkURL);
}

var addOutboundLinkTracking = function() {
  $("a").each(function() {
    var $link = $(this);
    var linkURL = $link.attr("href");

    if (hasHref(linkURL)) {
      return true;
    }

    if (isOutboundLink(linkURL)) {
      $link.attr("onclick", "trackOutboundLink('" + linkURL + "', true);");
    }
  });
};

$(document).ready(function() {
  addOutboundLinkTracking();
});