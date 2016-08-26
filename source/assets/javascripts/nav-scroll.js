// Adapted from http://callmenick.com/post/single-page-site-with-smooth-scrolling-highlighted-link-and-fixed-navigation
$(document).ready(function(){
    /**
     * This part handles the highlighting functionality.
     * We use the scroll functionality again, some array creation and
     * manipulation, class adding and class removing, and conditional testing
     */
    var aChildren = $("li.track-nav");//$("nav li").children(); // find the a children of the list items
    var aArray = []; // create the empty aArray
    for (var i=0; i < aChildren.length; i++) {
        var aChild = aChildren[i];
        var ahref = $(aChild).find('a').attr('href').substring(1);
        aArray.push(ahref);
    } // this for loop fills the aArray with attribute href values

    $(window).scroll(function(){
        var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
        var windowHeight = $(window).height(); // get the height of the window
        var docHeight = $(document).height();
        var topDivPos = docHeight;
        var topDivHeight = docHeight;

        for (var i=0; i < aArray.length; i++) {
            var theID = aArray[i];
            var theEl = $('a[name='+theID+']').first().closest('div').first();

            var offset = theEl.offset();
            if (typeof offset === 'undefined')
              continue;
            var divPos = offset.top; // get the offset of the div from the top of page
            var divHeight = theEl.height(); // get the height of the div in question

            if(divPos < topDivPos)
            {
              topDivPos = divPos;
              topDivHeight = divHeight;
            }

            var e = $("li.track-nav").children("a[href='#" + theID + "']").children("i.fa");
            if (windowPos + 50 >= divPos && windowPos < (divPos + divHeight)) {
                e.removeClass("nav-inactive").addClass("nav-active");
            } else {
                e.removeClass("nav-active").addClass("nav-inactive");
            }
        }

        if(windowPos + 50 < topDivPos + topDivHeight) {
          var navActiveCurrent = $(".nav-active").attr("href");
          $("a[href='#" + navActiveCurrent + "']").children("i.fa").removeClass("nav-active");
          $("li.track-nav:first-child a").children("i.fa").removeClass("nav-inactive").addClass("nav-active");
        }
        if(windowPos + windowHeight == docHeight) {
            if (!$("li.track-nav:last-child a").hasClass("nav-active")) {
                var navActiveCurrent = $(".nav-active").attr("href");
                $("a[href='#" + navActiveCurrent + "']").children("i.fa").removeClass("nav-active");
                $("li.track-nav:last-child a").children("i.fa").removeClass("nav-inactive").addClass("nav-active");
            }
        }
    });
});
