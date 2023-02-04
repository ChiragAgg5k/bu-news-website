var indexValue = 0;
function slideShow() {
  setTimeout(slideShow, 3000);
  var x;
  const img = document.querySelectorAll(".images img");
  for (x = 0; x < img.length; x++) {
    img[x].style.display = "none";
  }
  indexValue++;
  if (indexValue > img.length) { indexValue = 1 }
  img[indexValue - 1].style.display = "block";
}
slideShow();