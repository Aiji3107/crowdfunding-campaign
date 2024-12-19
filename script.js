const mainMenu = document.querySelector(".main-head");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    mainMenu.classList.add("sticky");
  } else {
    mainMenu.classList.remove("sticky");
  }
});

// Intersection Observer API untuk mendeteksi elemen ketika masuk viewport
const judul = document.querySelector(".judul");


const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Ketika elemen masuk ke dalam viewport
        judul.classList.add("visible");
        judul.classList.add("animate__animated", "animate__fadeIn"); // Memulai animasi dari animate.css
      } else {
        // Ketika elemen keluar dari viewport
        judul.classList.remove("visible");
        judul.classList.remove("animate__animated", "animate__fadeIn");
      }
    });
  },
  {
    threshold: 0.5, // Trigger saat setidaknya 50% elemen terlihat di viewport
  }
);

observer.observe(judul);
