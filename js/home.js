/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("topbar").style.top = "0";
    document.getElementById("mainnav").style.top = "20px";
    document.getElementById("mainnav").style.height = "70px";
  } else {
    document.getElementById("topbar").style.top = "-20px";
    document.getElementById("mainnav").style.top = "0";
    document.getElementById("mainnav").style.height = "80px";
  }
  prevScrollpos = currentScrollPos;
}