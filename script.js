// GSAP ScrollTrigger 애니메이션
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".fade").forEach(el => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play reverse play reverse"
    },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power2.out"
  });
});

// 마우스 트레일 파티클 효과
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
    ctx.fillStyle = `rgba(120, 160, 255, ${p.alpha})`; // 파스텔 블루
    ctx.fill();
    p.alpha *= 0.94;
  });
  requestAnimationFrame(animate);
}
animate();


// 네비게이션 드롭다운 메뉴 제어
const toggleBtn = document.querySelector('.menu-toggle');
const menu = document.querySelector('.dropdown-menu');

toggleBtn.addEventListener('click', () => {
  menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
});
