const primaryNav = document.querySelector(".nav__list");
const hamBtn = document.querySelector(".nav__ham");
const hamLines = document.querySelectorAll(".nav__ham-line");
const overlay = document.querySelector(".overlay");

function createOverlay(x) {
  let visibilityOverlay = overlay.getAttribute("data-visible");
  if (visibilityOverlay === "false") {
    overlay.setAttribute("data-visible", "true");
    overlay.setAttribute("aria-hidden", "false");
    x.setAttribute("data-visible", "true");
    x.setAttribute("aria-expanded", "true");
  } else {
    x.setAttribute("aria-expanded", "false");
    x.setAttribute("data-visible", "false");
    overlay.setAttribute("data-visible", "false");
    overlay.setAttribute("aria-hidden", "true");
  }
  overlay.addEventListener("click", (e) => {
    overlay.setAttribute("data-visible", "false");
    overlay.setAttribute("aria-hidden", "true");
    x.setAttribute("data-visible", "false");
    x.setAttribute("aria-expanded", "false");
  });
}

///////////  OPEN PRIMARY NAV AND CLOSE

hamBtn.addEventListener("click", (e) => {
  const visibility = primaryNav.getAttribute("data-visible");
  if (visibility === "false") {
    primaryNav.setAttribute("data-visible", "true");
    hamBtn.setAttribute("aria-expanded", "true");
    hamLines.forEach((line) => line.classList.add("active"));
    createOverlay(primaryNav);
    sidebar.style = `
      z-index: 2;
    `;
    ////// overlay;
    overlay.classList.add("overlay");
    document.body.append(overlay);
    overlay.addEventListener("click", (e) => {
      primaryNav.setAttribute("data-visible", "false");
      hamBtn.setAttribute("aria-expanded", "false");
      hamLines.forEach((line) => line.classList.remove("active"));
      overlay.remove();
    });
    ////// -----
  } else {
    sidebar.style = `
    z-index: 31;
  `;
    primaryNav.classList.add("inactive");
    primaryNav.setAttribute("data-visible", "false");
    overlay.setAttribute("data-visible", "false");
    hamBtn.setAttribute("aria-expanded", "false");
    hamLines.forEach((line) => line.classList.remove("active"));
  }
});

////////// FUNCTIONAL VIDEO CAROUSEL

if (location.href.includes("index")) {
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
const sidebar = document.querySelector(".sidebar");

asideBtn.addEventListener("click", (e) => {
  sidebar.setAttribute("data-visible", "true");
  if (
    overlay.getAttribute("data-visible") === "true" &&
    sidebar.getAttribute("data-visible") === "true"
  ) {
    sidebar.setAttribute("data-visible", "false");
  }
  createOverlay(sidebar);
});

//////////// COUNTER

const projectCounter = document.querySelector(".projects-counter");

window.addEventListener("scroll", (e) => {
  const rect = projectCounter.getBoundingClientRect();
  if (rect.bottom <= window.innerHeight) {
    const counters = document.querySelectorAll(".projects-counter__box-number");
    const speed = 2000;

    counters.forEach((counter) => {
      function updateCount() {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;

        const increment = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 1);
        } else {
          count.innerText = target;
        }
      }
      updateCount();
    });
  }
});

///////// CONTENT FADE IN ANIMATION

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

const hiddenSections = document.querySelectorAll(".hidden");
hiddenSections.forEach((el) => observer.observe(el));

////// SCROLL TO TOP BTN

const scrollToTop = document.querySelector(".scroll-to-top");
scrollToTop.addEventListener("click", (e) => {
  window.scroll({
    top: 0,
  });
});
window.addEventListener("scroll", (e) => {
  if (window.scrollY > 150) {
    scrollToTop.setAttribute("data-visible", "true");
  } else scrollToTop.setAttribute("data-visible", "false");
});

///////// PROGRESS LINE INDICATOR

window.addEventListener("scroll", (e) => {
  let winScroll = window.scrollY; /// 0 - 1519
  let height = document.body.scrollHeight - innerHeight; /// 2806 - 1287

  let scrolled = Math.ceil((winScroll / height) * 100);
  let indicatorLine = document.querySelector(".indicator-scroll-line");
  console.log(scrolled);
  indicatorLine.setAttribute("data-visible", "true");
  indicatorLine.style = `
      width: ${scrolled}%;
    `;
});
