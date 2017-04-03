// Adapted from http://callmenick.com/post/single-page-site-with-smooth-scrolling-highlighted-link-and-fixed-navigation
$(document).ready(function(){
    /**
     * This part handles the highlighting functionality.
     * We use the scroll functionality again, some array creation and
     * manipulation, class adding and class removing, and conditional testing
     */
    var aChildren = $("li.track-nav");
    var aArray = []; // create the empty aArray
    for (var i=0; i < aChildren.length; i++) {
        var aChild = aChildren[i];
        var ahref = $(aChild).find('a').attr('href').substring(1);
        aArray.push(ahref);
    } // this for loop fills the aArray with attribute href values

    $(window).scroll(function(){
        var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
        var closest = false;
        for (var i = aArray.length - 1; i >= 0; i--) {
            var theID = aArray[i];
            var theEl = $('a[name='+theID+']').first();

            var offset = theEl.offset();
            if (typeof offset === 'undefined')
              continue;
            var divPos = offset.top; // get the offset of the div from the top of page

            var e = $("li.track-nav").children("a[href='#" + theID + "']")
            if (!closest && (windowPos + 40 >= divPos)) {
                e.removeClass("nav-inactive").addClass("nav-active");
                closest = theID;
            } else {
                e.removeClass("nav-active").addClass("nav-inactive");
            }
        }
    }).trigger('scroll');
});
