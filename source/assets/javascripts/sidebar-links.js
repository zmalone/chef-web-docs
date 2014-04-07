// Make the sidebar root links clickable
$('.accordion').on('click', '.title a', function (event) {
  window.location.assign(event.currentTarget.href);
});
