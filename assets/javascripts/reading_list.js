function setImageSrc(img) {
  img.onload = function() {
    this.classList.add('loaded');
  }
  return img.src = img.getAttribute('data-img-src');
}

function checkIfBooksInViewport() {
  var bookImages = document.getElementsByClassName("book-img");
  for (var i = 0; i < bookImages.length; i++) {
    var bookImage = bookImages[i];
    if (bookImage.classList.contains('loaded')) {
      continue;
    }
    var rect = bookImage.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
      setImageSrc(bookImage);
    }
  }
}

var debouncedCheckIfBooksInViewport = debounce(function() {
  return checkIfBooksInViewport();
}, 250);

// borrows from https://gist.github.com/nmsdvid/8807205
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}

document.addEventListener("DOMContentLoaded", function() {
  window.onscroll = function() {
    debouncedCheckIfBooksInViewport();
  };
  return checkIfBooksInViewport();
});
