if (navigator.appVersion.indexOf("Win") !== -1) {
  $("a[href='#windows']:contains('Windows')").click();
}
if (navigator.appVersion.indexOf("Macintosh") != -1) {
  $("a[href='#os-x']:contains('OS X')").click();
}
if (navigator.appVersion.indexOf("X11") != -1) {
  $("a[href='#ubuntu']:contains('Ubuntu')").click()
}
