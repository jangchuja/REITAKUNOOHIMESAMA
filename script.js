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
ctx.fillStyle = `hsla(40, 60%, 70%, ${p.alpha})`; // 따뜻한 노란빛
ctx.fill();
});

requestAnimationFrame(animate);
}
animate();

// 커튼 메뉴 토글 기능
const toggleBtn = document.getElementById('curtainToggle');
const menu = document.getElementById('curtainMenu');
const overlay = document.getElementById('overlay');
const menuItems = menu.querySelectorAll('ul li a');

let isOpen = false;

function openMenu() {
// 메뉴 슬라이드 인
gsap.to(menu, { x: '-300px', duration: 0.8, ease: "power3.out" });

// 너구리 버튼 슬라이드 인
gsap.to(toggleBtn, { x: -300, duration: 0.8, ease: "power3.out" });

// 오버레이 활성화
gsap.to(overlay, { opacity: 1, pointerEvents: 'auto', duration: 0.5 });

// 메뉴 항목 스태거 애니메이션: 아래에서 올라오며 페이드 인
gsap.fromTo(menuItems, 
{ y: 20, opacity: 0 },
{ y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out", delay: 0.3 }
);

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

let footer = document.querySelector('.team-footer');

let scrollTimeout;

window.addEventListener('scroll', () => {

gsap.to(footer, {
opacity: 0,
duration: 0.15,
onComplete: () => {
footer.style.visibility = 'hidden';
}
});


clearTimeout(scrollTimeout);

scrollTimeout = setTimeout(() => {
gsap.to(footer, {
opacity: 1,
duration: 0.3,
onStart: () => {
footer.style.visibility = 'visible';
}
});
}, 300);

});

function openModal(personId) {
const modal = document.getElementById("modal");
const modalDetails = document.getElementById("modalDetails");

function openModal(personId) {
  const modal = document.getElementById("modal");
  const modalDetails = document.getElementById("modalDetails");

}

  const profiles = {
    person1: {
      name: "장소윤",
      role: "張蘇允　チャンソユン",
      email: "kwala9@naver.com",
      github: "https://github.com/kwala9",
      hobby: "ベイキング",
      comment: "チームの皆さんと協力しながら課題を解決できたことが、とても大きな学びになりました。新しい発想に触れることで自分の視野も広がったと感じています。",
      image: "images/JSY.jpg"
    },
    person2: {
      name: "장태원",
      role: "張泰元　チャンテウォン",
      email: "jto000040@gmail.com",
      github: "https://github.com/jangchuja",
      hobby: "ランニング",
      comment: "プロジェクトを進める中で、自分の弱点や改善点に気づくことができました。同時に仲間の支えの大切さを改めて実感し、貴重な経験となりました。",
      image: "images/JTW.jpg"
    },
    person3: {
      name: "최부권",
      role: "崔傅棬　チェブグォン",
      email: "stitch4324@gmail.com",
      github: "linkedin.com/in/lee",
      hobby: "アニメ鑑賞",
      comment: "最初は不安もありましたが、最後までやり遂げられたことで自信につながりました。学んだことを今後の挑戦に活かしていきたいと思います。",
      image: "images/CBG.jpg"
    }
  };

  const person = profiles[personId];
  if (!person || !modal || !modalDetails) return;

  modalDetails.innerHTML = `
     <div class="card-layout">
       <div class="card-left">
         <img src="${person.image}" alt="${person.name}" />
       </div>
       <div class="card-right">
         <h2>${person.name}</h2>
         <p>${person.role}</p>
         <p>📧 ${person.email}</p>
         <p>💼 <a href="#">${person.github}</a></p>
         <p>🎯 趣味: ${person.hobby}</p>
         <p>📝 感想: ${person.comment}</p>
       </div>
     </div>
   `;

  modal.style.display = "flex";
  setTimeout(() => {
    modal.style.opacity = "1";
  }, 10);
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.style.opacity = "0";
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  }
}

window.addEventListener('load', () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);
});


