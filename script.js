// ================= LOAD PROJECT AUTOCAD =================
const API_URL_foto =
  "https://script.google.com/macros/s/AKfycbzJcLRJxf28yiYtr_Lur-BpQyuw3Zx7TDA6r6WLGkia19qsT6g83Xhu4c-JX81O4RkN/exec";

async function loadProject() {
  const container = document.getElementById("projectContainer");
  container.innerHTML = "<p>Memuat project...</p>";

  try {
    const res = await fetch(API_URL_foto);
    const files = await res.json(); // ⬅️ LANGSUNG ARRAY

    if (!files.length) {
      container.innerHTML = "<p>Tidak ada gambar.</p>";
      return;
    }

    container.innerHTML = "";

    files.forEach((file) => {
      const card = document.createElement("div");
      card.className = "doc-card";

      card.innerHTML = `
        <a href="${file.url}" target="_blank">
          <img src="${file.thumbnail}" alt="${file.name}">
        </a>
        <p>${file.name}</p>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p style='color:red'>Gagal memuat project.</p>";
  }
}

window.addEventListener("load", loadProject);
window.onload = () => {
  loadProject();
};

/* ================= SMOOTH SCROLL ================= */
document.querySelectorAll("a[href^='#']").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    document
      .querySelector(a.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

/* ================= MAGIC CURSOR ================= */
const cursor = document.querySelector(".magic-cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

/* ================= SCROLL REVEAL ================= */
const reveals = document.querySelectorAll("section, .project-card");
const revealOnScroll = () => {
  reveals.forEach((el) => {
    if (el.getBoundingClientRect().top < innerHeight - 100) {
      el.classList.add("active");
    }
  });
};
reveals.forEach((el) => el.classList.add("reveal"));
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* ================= DARK MODE ================= */
const toggle = document.getElementById("modeToggle");
toggle.onclick = () => {
  document.body.classList.toggle("light");
  toggle.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
};

/* ================= CANVAS PARTICLES ================= */
const canvas = document.getElementById("magicCanvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

window.onresize = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
};

const particles = Array.from({ length: 120 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 2 + 1,
  dx: (Math.random() - 0.5) * 0.6,
  dy: (Math.random() - 0.5) * 0.6,
  c: `hsla(${Math.random() * 360},100%,70%,0.8)`,
}));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.c;
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();

/* ===============================
   LOADER
================================ */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => (loader.style.opacity = "0"), 1500);
  setTimeout(() => loader.remove(), 2200);
});

/* ===============================
   SPELL SOUND
================================ */
const spell = document.getElementById("spellSound");
const hover = document.getElementById("hoverSound");

document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    hover.currentTime = 0;
    hover.play();
  });
  el.addEventListener("click", () => {
    spell.currentTime = 0;
    spell.play();
  });
});

/* ===============================
   TYPING EFFECT HERO
================================ */
const heroText = document.querySelector(".hero p");
const text = heroText.textContent;
heroText.textContent = "";
heroText.classList.add("magic-typing");

let i = 0;
function typeEffect() {
  if (i < text.length) {
    heroText.textContent += text.charAt(i);
    i++;
    setTimeout(typeEffect, 40);
  }
}
typeEffect();

/* ===============================
   ADVANCED CURSOR TRAIL
================================ */
document.addEventListener("mousemove", (e) => {
  const spark = document.createElement("div");
  spark.style.position = "fixed";
  spark.style.left = e.clientX + "px";
  spark.style.top = e.clientY + "px";
  spark.style.width = "6px";
  spark.style.height = "6px";
  spark.style.borderRadius = "50%";
  spark.style.background = "hsla(" + Math.random() * 360 + ",100%,70%,0.8)";
  spark.style.pointerEvents = "none";
  spark.style.zIndex = "9998";
  document.body.appendChild(spark);

  setTimeout(() => spark.remove(), 400);
});

/* ================= HAMBURGER MENU ================= */
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const hoverSound = document.getElementById("hoverSound");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  hoverSound?.play();
});

/* AUTO CLOSE ON CLICK */
document.querySelectorAll("#nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});
