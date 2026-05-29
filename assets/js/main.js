const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const cursorGlow = document.querySelector(".cursor-glow");
const typingLine = document.getElementById("typing-line");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const count = Math.min(110, Math.max(48, Math.floor(window.innerWidth / 14)));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.55,
    vy: (Math.random() - 0.5) * 0.55,
    r: Math.random() * 1.8 + 0.6
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(120, 220, 255, 0.72)";
    ctx.fill();

    for (let j = i + 1; j < particles.length; j += 1) {
      const q = particles[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 120) {
        ctx.strokeStyle = "rgba(125, 95, 255, " + (0.18 * (1 - distance / 120)) + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(drawParticles);
}

navToggle && navToggle.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  siteNav.classList.toggle("open");
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle && navToggle.setAttribute("aria-expanded", "false");
    siteNav && siteNav.classList.remove("open");
  });
});

const typingPhrases = [
  "building Robocode AI bots...",
  "designing software architecture...",
  "rendering UML deployment diagrams...",
  "deploying via GitHub Actions...",
  "syncing Jekyll blog..."
];
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeStatus() {
  if (!typingLine) return;
  const phrase = typingPhrases[phraseIndex];
  typingLine.textContent = phrase.slice(0, charIndex);

  if (!deleting && charIndex < phrase.length) {
    charIndex += 1;
    setTimeout(typeStatus, 58);
    return;
  }
  if (!deleting && charIndex === phrase.length) {
    deleting = true;
    setTimeout(typeStatus, 1300);
    return;
  }
  if (deleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(typeStatus, 28);
    return;
  }

  deleting = false;
  phraseIndex = (phraseIndex + 1) % typingPhrases.length;
  setTimeout(typeStatus, 260);
}

function setupReveal() {
  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = Math.min(index % 6, 5) * 70 + "ms";
    observer.observe(item);
  });
}

function setupTilt() {
  const cards = document.querySelectorAll(".tilt-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = "perspective(900px) rotateX(" + (-y * 5).toFixed(2) + "deg) rotateY(" + (x * 6).toFixed(2) + "deg) translateY(-3px)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

window.addEventListener("pointermove", (event) => {
  if (!cursorGlow) return;
  cursorGlow.style.opacity = "1";
  cursorGlow.style.left = event.clientX + "px";
  cursorGlow.style.top = event.clientY + "px";
});

window.addEventListener("pointerleave", () => {
  if (cursorGlow) cursorGlow.style.opacity = "0";
});

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawParticles();
typeStatus();
setupReveal();
setupTilt();
