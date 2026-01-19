document.addEventListener("DOMContentLoaded", () => {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const dots = Array.from(document.querySelectorAll(".dot"));
  const left = document.querySelector(".slider-arrow.left");
  const right = document.querySelector(".slider-arrow.right");

  if (!slides.length) return;

  let index = 0;
  let timer = null;

  function setActive(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach((s, n) => s.classList.toggle("is-active", n === index));
    dots.forEach((d, n) => d.classList.toggle("active", n === index));
  }

  function next() { setActive(index + 1); }
  function prev() { setActive(index - 1); }

  function startAuto() {
    stopAuto();
    timer = setInterval(next, 5000);
  }
  function stopAuto() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  if (left) left.addEventListener("click", () => { prev(); startAuto(); });
  if (right) right.addEventListener("click", () => { next(); startAuto(); });

  dots.forEach((d, n) => d.addEventListener("click", () => { setActive(n); startAuto(); }));

  const slider = document.querySelector(".slider");
  if (slider) {
    slider.addEventListener("mouseenter", stopAuto);
    slider.addEventListener("mouseleave", startAuto);
  }

  setActive(0);
  startAuto();

  // Demo login button (member page)
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const email = document.getElementById("email")?.value?.trim();
      const pass = document.getElementById("password")?.value?.trim();
      if (!email || !pass) {
        alert("Please enter email and password.");
        return;
      }
      alert(`Welcome, ${email}! (demo login)`);
    });
  }
});
