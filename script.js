document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.dropdown-menu');

  toggleBtn?.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  const canvas = document.getElementById("cursorCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const mouse = { x: 0, y: 0 };

  document.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    particles.push({ x: mouse.x, y: mouse.y, alpha: 1 });
    if (particles.length > 30) particles.shift();
  });

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 6 * p.alpha, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(120, 160, 255, ${p.alpha})`;
      ctx.fill();
      p.alpha *= 0.94;
    });
    requestAnimationFrame(animate);
  }
  animate();
});

