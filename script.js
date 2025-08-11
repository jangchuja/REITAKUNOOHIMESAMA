// GSAP ScrollTrigger 애니메이션 등록
gsap.registerPlugin(ScrollTrigger);

// 스크롤 시 .fade 요소에 페이드+슬라이드 업 효과
gsap.utils.toArray(".fade").forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play reverse play reverse",
      },
    }
  );
});

// 마우스 트레일 파티클 효과
const canvas = document.getElementById("cursorCanvas");
const ctx = canvas.getContext("2d");

let dpi = window.devicePixelRatio || 1;

function resizeCanvas() {
  canvas.width = window.innerWidth * dpi;
  canvas.height = window.innerHeight * dpi;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.scale(dpi, dpi);
}

resizeCanvas();

const particles = [];
const mouse = { x: 0, y: 0 };

document.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  particles.push({ x: mouse.x, y: mouse.y, alpha: 1, vx: (Math.random() - 0.5) * 1, vy: (Math.random() - 0.5) * 1 });
  if (particles.length > 50) particles.shift();
});

window.addEventListener("resize", () => {
  resizeCanvas();
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.alpha *= 0.94;
    if (p.alpha < 0.01) p.alpha = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 6 * p.alpha, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(120, 160, 255, ${p.alpha})`;
    ctx.fill();
  });

  requestAnimationFrame(animate);
}
animate();

// 커튼 메뉴 토글 기능
const toggleBtn = document.getElementById('curtainToggle');
const menu = document.getElementById('curtainMenu');
const overlay = document.getElementById('overlay');

let isOpen = false;

function openMenu() {
  // 메뉴 오른쪽에서 왼쪽으로 슬라이드 인
  gsap.to(menu, { x: '-300px', duration: 0.8, ease: "power3.out" });

  // 캐릭터 버튼도 메뉴 왼쪽 경계에 딱 붙도록 이동
  gsap.to(toggleBtn, { x: -300, duration: 0.8, ease: "power3.out" });

  gsap.to(overlay, { opacity: 1, pointerEvents: 'auto', duration: 0.5 });
  toggleBtn.setAttribute('aria-expanded', 'true');
  menu.setAttribute('aria-hidden', 'false');
  isOpen = true;
}

function closeMenu() {
  // 메뉴 원위치로 슬라이드 아웃
  gsap.to(menu, { x: '0', duration: 0.8, ease: "power3.in" });

  // 캐릭터 버튼 원위치로 복귀
  gsap.to(toggleBtn, { x: 0, duration: 0.8, ease: "power3.in" });

  gsap.to(overlay, { opacity: 0, pointerEvents: 'none', duration: 0.5 });
  toggleBtn.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');
  isOpen = false;
}


toggleBtn.addEventListener('click', () => {
  if (isOpen) closeMenu();
  else openMenu();
});

overlay.addEventListener('click', closeMenu);

window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && isOpen) closeMenu();
});

// 폼 실시간 검증 및 전송 예제
const form = document.getElementById('contactForm');
const feedback = form.querySelector('.form-feedback');

form.addEventListener('submit', e => {
  e.preventDefault();

  // 기본 HTML5 유효성 검증 외에 커스텀 검증 가능
  if (!form.checkValidity()) {
    feedback.textContent = "全ての必須項目を正しく入力してください。";
    return;
  }

  feedback.textContent = "送信中...";

  // 예: AJAX 전송 시뮬레이션
  setTimeout(() => {
    feedback.textContent = "送信が成功しました。ありがとうございました！";
    form.reset();
  }, 1000);
});

