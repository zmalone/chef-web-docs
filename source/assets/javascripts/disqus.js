$(document).ready(function() {
  var disqusEl = $('#disqus_thread');
  var element = disqusEl[0];
  if (!element) return;

  disqusEl.hide();
  $('.discussion .btn').click(function() {
    disqusEl.slideDown();
  });

  var disqus_shortname = 'learnchef';
  var disqus_identifier = window.currentPage.url;
  var disqus_url = window.baseUrl + window.currentPage.url + '/';

  (function() {
    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = 'https://' + disqus_shortname + '.disqus.com/embed.js';

    // Insert a greeting after Disqus loads.
    dsq.onload = function() {
      var para = document.createElement("p");
      para.innerHTML = "\
            <h2 style=\"color: #666666; margin-bottom: 20px;\">Feedback</h2> \
            <p style=\"color: #666666;\">Need clarification or stuck on a step? We’re here to help!</p> \
            <p style=\"color: #666666;\">Before asking a question, ensure your configuration matches what’s shown. This includes operating systems, network configuration, and software version numbers.</p> \
            <p style=\"color: #666666;\">When asking a question, please provide:</p> \
            <ul style=\"line-height: 1.5; color: #666666;\"> \
            <li style=\"color: #666666;\"> \
            the operating system you’re running on your workstation. \
            </li> \
            <li style=\"color: #666666;\"> \
            your Chef DK, chef-client, and other applicable software versions. \
            </li> \
            <li style=\"color: #666666;\"> \
            the command you’re running along with the output and any errors that you see. We highly recommend using <a href=\"https://gist.github.com\" target=\"_blank\">GitHub Gist</a> to help keep things readable. \
            </li> \
            </ul> \
            <p style=\"color: #666666;\"> \
            For general questions about Chef, <a href=\"https://discourse.chef.io\" target=\"_blank\">join us on Discourse</a>. For support issues, <a href=\"https://www.chef.io/support/\" target=\"_blank\">visit our support page</a>. \
            </p> \
            <hr>";
      para.style.color = "#666";
      element.insertBefore(para, element.firstChild);
    };

    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  })();
});
