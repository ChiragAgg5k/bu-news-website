
var prevScrollpos = window.pageYOffset;
const toggleButton = document.getElementById('toggle-icon');

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
window.onscroll = function () {
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

// toggle dark mode
function toggleDarkMode() {
  var element = document.body;
  var a = document.querySelectorAll("a");
  var nav = document.getElementById("mainnav");
  var topBorder = document.getElementById("topbar");
  
  element.classList.toggle("dark-mode");
  nav.classList.toggle("nav-dark-mode");
  topBorder.classList.toggle("topborder-dark-mode");

  for (var i = 0; i < a.length; i++) {
    a[i].classList.toggle("a-dark-mode");
  }
}

toggleButton.addEventListener('click',e => {
  toggleDarkMode();
  toggleButton.classList.toggle('fa-sun');
});
