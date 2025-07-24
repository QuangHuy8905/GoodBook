document.addEventListener("DOMContentLoaded", () => {
  const scrollElements = document.querySelectorAll(".scroll-animate");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  scrollElements.forEach(el => observer.observe(el));
});

let currentIndex = 0;
const imageWidth = 220;
const slider = document.getElementById('slider');
const totalImages = slider.children.length;
let interval;

// Khi slide
function nextSlide() {
  currentIndex++;
  slider.style.transition = "transform 0.5s ease-in-out";
  slider.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
  updateActiveImage();

  // Nếu đến giữa clone (tức là hết vòng gốc)
  if (currentIndex >= totalImages / 2) {
    // Sau khi animation hoàn tất → reset về đầu
    slider.addEventListener("transitionend", resetSlider, { once: true });
  }
}

// ✅ Reset về đầu thật mượt, không khựng
function resetSlider() {
  // Tắt animation
  slider.style.transition = "none";
  currentIndex = 0;
  slider.style.transform = `translateX(0px)`;
  updateActiveImage();

  // Ép browser cập nhật lại layout để tránh khựng frame
  requestAnimationFrame(() => {
    slider.style.transition = "transform 0.5s ease-in-out";
  });
}

function updateActiveImage() {
  const imgs = Array.from(slider.children);
  imgs.forEach(img => img.classList.remove('active'));
  const activeIndex = currentIndex + 1; // ảnh giữa trong 3 ảnh
  if (imgs[activeIndex]) {
    imgs[activeIndex].classList.add('active');
  }
}

function startSlide() {
  interval = setInterval(nextSlide, 7000);
}

function pauseSlide() {
  clearInterval(interval);
}

function resumeSlide() {
  startSlide();
}

window.onload = () => {
  slider.style.transform = `translateX(0px)`;
  updateActiveImage();      // fix ảnh giữa không to khi mới load
  startSlide();
};

