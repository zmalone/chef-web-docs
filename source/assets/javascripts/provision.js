if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

function setCookie(cname, cvalue, exdate) {
    var d = new Date();
    var expires = "expires=" + new Date(exdate).toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

function formatLocalTime(utcTimeString) {
  var date = new Date(utcTimeString);
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var hours = ["12", "1", "2", "3", "4", "5", "6",
               "7", "8", "9", "10", "11", "12",
               "1", "2", "3", "4", "5", "6",
               "7", "8", "9", "10", "11", "12"];
  hour = date.getHours();
  // Thu, July23 at 10:45 AM
  return days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate() + " at " +
  hours[date.getHours()] + ":" + ("0" + date.getMinutes()).slice(-2) + (hour > 11 ? " PM" : " AM");
}

function provisionHelper(provider, os, module, button_id, show_id, show_id_on_success, show_id_on_error, success_callback) {
  //document.getElementById(hide_id).style.display = 'none';
  var button, session_id, url, module_path;

  button = document.getElementById(button_id);
  button.style.disabled = true;
  button.style.cursor = 'default';
  button.style.background = '#ccc';
  button.style.borderColor = '#aaa';

  document.getElementById(show_id).style.display = 'inherit';

  module_path = "{0}/{1}/{2}".format(provider, os, module);

  url = "http://localhost:3000/labs/{0}/provision".format(module_path);
  session_id = getCookie(module_path);
  if (session_id != "") {
    url += "?session_id=" + session_id;
  }
  console.log("SESSION_ID " + session_id)

  $.ajax({
    dataType: 'json',
    headers: {
      Accept: 'application/json'
    },
    url: url,
    success: function(result, status, xhr) {
      var oSuccess, data;

      data = result[0];

      document.getElementById(show_id).style.display = 'none';

      oSuccess = document.getElementById(show_id_on_success);
      oSuccess.innerHTML = oSuccess.innerHTML.format(
        data.returning_user ? "Welcome back." : "",
        data.username,
        data.password,
        data.ip,
        formatLocalTime(data.expirationTime),
        data.access_restriction);

      setCookie(module_path, data.session_id, data.expirationTime);

      oSuccess.style.display = 'inherit';

      if (typeof success_callback !== 'undefined') {
        success_callback(result);
      }

    }, error: function(xhr, textStatus, errorThrown) {

        document.getElementById(show_id).style.display = 'none';
        document.getElementById(show_id_on_error).style.display = 'inherit';
    }
  });
}
