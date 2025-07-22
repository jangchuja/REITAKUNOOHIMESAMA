gsap.registerPlugin(ScrollTrigger);

// 스크롤 애니메이션
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

// 마우스트래킹 (차분한 파스텔 블루)
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

// 폼 전송 확인
document.getElementById("contactForm").onsubmit = function (e) {
  e.preventDefault();
  alert("メッセージをありがとうございます。心より感謝いたします。");
  this.reset();
};

