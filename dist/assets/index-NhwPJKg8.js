import Swiper from "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");
  tabButtons.forEach((button) => {
    button.addEventListener("click", function() {
      const tabId = this.getAttribute("data-tab");
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));
      this.classList.add("active");
      const activeContent = document.getElementById(tabId);
      if (activeContent) {
        activeContent.classList.add("active");
      }
    });
  });
}
function lightboxImage() {
  const lightboxOverlay = document.getElementById("lightboxOverlay");
  const lightboxImage2 = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");
  const productImages = document.querySelectorAll(".product-image img");
  function openLightbox(imageSrc) {
    lightboxImage2.src = imageSrc;
    lightboxOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightboxOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }
  productImages.forEach((img) => {
    img.addEventListener("click", function() {
      openLightbox(this.src);
    });
  });
  lightboxClose.addEventListener("click", function(e) {
    e.stopPropagation();
    closeLightbox();
  });
  lightboxOverlay.addEventListener("click", function(e) {
    if (e.target === lightboxOverlay) {
      closeLightbox();
    }
  });
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && lightboxOverlay.classList.contains("active")) {
      closeLightbox();
    }
  });
}
async function initApp() {
  initTabs();
  lightboxImage();
}
document.addEventListener("DOMContentLoaded", function() {
  initApp();
});
new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  // pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function(index, className) {
      return `<span class="${className} product-image-thumb">
                <img src="/images/product-1.jpg" alt />
              </span>`;
    }
  },
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
});
