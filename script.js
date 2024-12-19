const mainMenu = document.querySelector(".main-head");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    mainMenu.classList.add("sticky");
  } else {
    mainMenu.classList.remove("sticky");
  }
});

// Intersection Observer API
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1, // Elemen harus 10% terlihat
};

const animateElements = document.querySelectorAll(".zoomIn, .judul, .num");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute("data-delay") || "0s"; // Ambil delay dari atribut
      entry.target.style.animationDelay = delay; // Tambahkan delay ke style elemen
      entry.target.classList.add(
        "visible",
        "animate__animated",
        "animate__zoomIn"
      );
      entry.target.classList.remove("animate__zoomOut");
    } else {
      entry.target.style.animationDelay = "0s"; // Reset delay
      entry.target.classList.remove("animate__zoomIn");
      entry.target.classList.add("animate__animated", "animate__zoomOut");
    }
  });
}, observerOptions);

animateElements.forEach((el) => observer.observe(el));

// Fungsi untuk animasi counting
function animateNumber(valueDisplay) {
  let startValue = 0;
  let endValue = parseInt(valueDisplay.getAttribute("data-val"));
  let interval = 2500; // Total durasi animasi
  let duration = Math.floor(interval / endValue);

  let counter = setInterval(() => {
    startValue += 1;
    valueDisplay.textContent = startValue;
    if (startValue === endValue) {
      clearInterval(counter);
    }
  }, duration);
}

// Intersection Observer untuk reset counting ketika elemen hilang
const countingObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute("data-delay") || "0s"; // Ambil delay
      entry.target.style.animationDelay = delay; // Atur delay
      entry.target.classList.add("visible"); // Tampilkan elemen

      // Jalankan animasi counting hanya saat elemen pertama kali terlihat atau setelah hilang
      if (!entry.target.classList.contains("counted")) {
        animateNumber(entry.target);
        entry.target.classList.add("counted"); // Tandai elemen sudah dihitung
      }
    } else {
      entry.target.classList.remove("visible"); // Hilangkan elemen jika tidak terlihat
      entry.target.classList.remove("counted"); // Reset counting ketika elemen hilang
    }
  });
}, observerOptions);

// Pilih semua elemen dengan kelas "num"
const countingAnimate = document.querySelectorAll(".num");
// Amati elemen
countingAnimate.forEach((el) => countingObserver.observe(el));

// Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetElement = document.querySelector(this.getAttribute("href"));

    // Menghitung jarak untuk posisi tengah layar
    const offset = (window.innerHeight - targetElement.offsetHeight) / 2;
    window.scrollTo({
      top: targetElement.offsetTop - offset,
      behavior: "smooth",
    });
  });
});