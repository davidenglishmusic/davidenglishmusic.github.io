function setImageSrc(img) {
  img.onload = function() {
    this.classList.add('loaded');
  }
  return img.src = img.getAttribute('data-img-src');
}

function checkIfBooksInViewport() {
  const bookImages = document.getElementsByClassName("book-img");

  for (const bookImage of bookImages) {
    if (bookImage.classList.contains('loaded')) {
      continue;
    }
    const rect = bookImage.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
      setImageSrc(bookImage);
    }
  }
}

const debouncedCheckIfBooksInViewport = debounce(() => checkIfBooksInViewport(), 250);

// borrows from https://gist.github.com/nmsdvid/8807205
function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}

document.addEventListener("DOMContentLoaded", () => {
  window.onscroll = () => {
    debouncedCheckIfBooksInViewport();
  };
  return checkIfBooksInViewport();
});
