const primaryNav = document.querySelector(".nav__list");
const hamBtn = document.querySelector(".nav__ham");
const hamLines = document.querySelectorAll(".nav__ham-line");
let overlay = document.createElement("div");

///////////  OPEN PRIMARY NAV AND CLOSE

hamBtn.addEventListener("click", (e) => {
  const visibility = primaryNav.getAttribute("data-visible");
  if (visibility === "false") {
    primaryNav.setAttribute("data-visible", "true");
    hamBtn.setAttribute("aria-expanded", "true");
    hamLines.forEach((line) => line.classList.add("active"));
    // overlay
    overlay.classList.add("overlay");
    document.body.append(overlay);
    overlay.addEventListener("click", (e) => {
      primaryNav.setAttribute("data-visible", "false");
      hamBtn.setAttribute("aria-expanded", "false");
      hamLines.forEach((line) => line.classList.remove("active"));
      primaryNav.classList.add("inactive");
      overlay.remove();
    });
    // -----
  } else {
    primaryNav.classList.add("inactive");
    primaryNav.setAttribute("data-visible", "false");
    hamBtn.setAttribute("aria-expanded", "false");
    hamLines.forEach((line) => line.classList.remove("active"));
    overlay.remove();
  }
});

if (location.href.includes("index")) {
  ////////// FUNCTIONAL VIDEO CAROUSEL
  const left = document.querySelector(".video__left");
  const right = document.querySelector(".video__right");
  const scrollContainer = document.querySelector(".promo-video__sub-video");

  const videoClips = document.querySelectorAll(".video");
  videoClips.forEach((video) => {
    video.addEventListener("click", (e) => {
      let singleURL = e.target.firstElementChild.src;
      e.target.closest(
        ".promo-video__inner-wrapper"
      ).previousElementSibling.firstElementChild.src = singleURL;
    });
  });

  right.addEventListener("click", (e) => {
    scrollContainer.scrollBy({
      top: 0,
      left: 1,
      behavior: "smooth",
    });
  });

  left.addEventListener("click", (e) => {
    scrollContainer.scrollBy({
      top: 0,
      left: -1,
      behavior: "smooth",
    });
  });

  //////////  IMAGE CAROUSEL

  const leftArrow = document.querySelector(".hero__left");
  const rightArrow = document.querySelector(".hero__right");
  if (rightArrow) {
    rightArrow.addEventListener("click", () => {
      nextSlide();
      if (auto) {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
      }
    });
  }
  if (leftArrow) {
    leftArrow.addEventListener("click", () => {
      prevSlide();
      if (auto) {
        clearInterval(slideInterval);
        slideInterval = setInterval(prevSlide, intervalTime);
      }
    });
  }
  const carouselSlider = document.querySelector(".hero__slider");
  const images = document.querySelectorAll(".hero__slider-picture");

  const auto = true;
  const intervalTime = 5000;
  let slideInterval;

  const nextSlide = () => {
    const current = document.querySelector(".current");
    current.classList.remove("current");
    if (current.nextElementSibling) {
      current.nextElementSibling.classList.add("current");
    } else {
      images[0].classList.add("current");
    }
  };

  const prevSlide = () => {
    const current = document.querySelector(".current");
    current.classList.remove("current");
    if (current.previousElementSibling) {
      current.previousElementSibling.classList.add("current");
    } else {
      images[images.length - 1].classList.add("current");
    }
  };

  if (auto) {
    slideInterval = setInterval(nextSlide, intervalTime);
  }
}

//////// SEARCH BAR

const searchBtn = document.querySelector(".search-btn");
const searchBtnClose = document.querySelector(".search__close");
const searchOverlay = document.querySelector(".search__overlay");

searchBtn.addEventListener("click", (e) => {
  if (searchOverlay.getAttribute("data-visible") === "false") {
    searchOverlay.setAttribute("data-visible", "true");
    searchOverlay.setAttribute("aria-hidden", "false");
    searchBtn.setAttribute("aria-expanded", "true");
  }
  searchBtnClose.addEventListener("click", closeSearchWindow);
  document.body.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeSearchWindow();
    }
  });
});
function closeSearchWindow() {
  searchOverlay.setAttribute("aria-hidden", "true");
  searchOverlay.setAttribute("data-visible", "false");
  searchBtn.setAttribute("aria-expanded", "false");
}

// MAIN PADDING TOP

const headerHeight = document.querySelector(".header").scrollHeight;
const main = document.querySelector(".main");
function paddingTopMain() {
  main.style = `
    padding-top: ${headerHeight}px;
  `;
}
if (window.innerWidth > 960) {
  paddingTopMain();
}

// SIDEBAR BUTTON to OPEN

const asideBtn = document.querySelector(".sidebar-btn");

asideBtn.addEventListener("click", (e) => {
  asideBtn.parentElement.classList.toggle("active");
  // overlay.classList.add("overlay");
  // document.body.append(overlay);
});
