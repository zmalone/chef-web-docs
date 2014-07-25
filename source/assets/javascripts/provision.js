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

function formatLocalTime(utcTimeString) {
  var date = new Date(utcTimeString);
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  hour = date.getHours();
  // Thu, July23 at 10:45 AM
  return days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate() + " at " + (hour > 12 ? hour - 12 : hour) + ":" + ("0" + date.getMinutes()).slice(-2) + (hour > 11 ? " PM" : " AM");
}

function provisionHelper(url, hide_id, show_id, show_id_on_success, show_id_on_error, success_callback) {
  document.getElementById(hide_id).style.display = 'none';
  document.getElementById(show_id).style.display = 'inherit';

  $.ajax({
    dataType: 'json',
    headers: {
      Accept: 'application/json'
    },
    url: url,
    success: function(result, status, xhr) {
      var oSuccess, data;

      data = result[0];
      //console.log(data);

      document.getElementById(show_id).style.display = 'none';

      oSuccess = document.getElementById(show_id_on_success);
      oSuccess.innerHTML = oSuccess.innerHTML.format(
        data.returning_user ? "Welcome back." : "",
        data.username,
        data.password,
        data.ip,
        formatLocalTime(data.expirationTime));
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
