const canvas = document.getElementById('ambientCanvas');
const ctx = canvas.getContext('2d');
let W = 0;
let H = 0;
let dpr = Math.min(window.devicePixelRatio || 1, 2);

const stars = [];

function resizeCanvas(){
  W = window.innerWidth;
  H = window.innerHeight;
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = `${W}px`;
  canvas.style.height = `${H}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas, { passive:true });

for(let i = 0; i < 72; i++){
  stars.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.7 + .2,
    v: Math.random() * .25 + .04,
    a: Math.random() * .52 + .12,
    t: Math.random() * Math.PI * 2,
    hue: Math.floor(Math.random() * 4)
  });
}

const starColors = [
  '61,220,255',
  '216,180,254',
  '79,124,255',
  '255,213,26'
];

function drawStars(){
  ctx.clearRect(0, 0, W, H);

  for(const s of stars){
    s.y -= s.v;
    s.t += .012;
    if(s.y < -6) s.y = H + 6;

    const alpha = Math.max(.04, s.a + Math.sin(s.t) * .10);
    const rgb = starColors[s.hue];
    ctx.fillStyle = `rgba(${rgb},${alpha})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(drawStars);
}

drawStars();

/* GALERIA: tilt suave */
function attachTilt(el, max = 5){
  el.addEventListener('pointermove', event => {
    if(window.innerWidth < 900) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - .5;
    const py = (event.clientY - rect.top) / rect.height - .5;
    el.style.transform = `perspective(900px) rotateX(${-py * max}deg) rotateY(${px * max}deg) translateY(-4px)`;
  });

  el.addEventListener('pointerleave', () => {
    el.style.transform = '';
  });
}

document.querySelectorAll('.tilt').forEach(card => attachTilt(card, 4.5));

/* FOTO AUSENTE: mantém o quadro bonito até a pessoa colocar o arquivo */
document.querySelectorAll('.memory-card img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.opacity = '0';
    img.parentElement.classList.add('image-missing');
  });
});

/* MEMÓRIA */
const memoryPanel = document.getElementById('memoryPanel');
const memoryToggle = document.getElementById('memoryToggle');
const closeMemory = document.getElementById('closeMemory');

memoryToggle.addEventListener('click', () => {
  memoryPanel.classList.add('open');
  memoryPanel.setAttribute('aria-hidden', 'false');
});

function closePanel(){
  memoryPanel.classList.remove('open');
  memoryPanel.setAttribute('aria-hidden', 'true');
}

closeMemory.addEventListener('click', closePanel);

memoryPanel.addEventListener('click', event => {
  if(event.target === memoryPanel) closePanel();
});

/* ENTRADA */
const unlockButton = document.getElementById('unlockBtn');
const progressBar = document.getElementById('progressBar');
const progressLabel = document.getElementById('progressLabel');
let locked = false;

unlockButton.addEventListener('click', () => {
  if(locked) return;
  locked = true;

  let progress = 0;
  progressLabel.textContent = 'AUTHENTICATING';
  unlockButton.style.pointerEvents = 'none';

  const timer = setInterval(() => {
    progress += Math.floor(Math.random() * 14) + 8;

    if(progress >= 100){
      progress = 100;
      clearInterval(timer);
      progressLabel.textContent = 'ACCESS GRANTED';
      document.body.classList.add('unlocking');

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 760);
    }

    progressBar.style.width = `${progress}%`;
  }, 95);
});

document.addEventListener('keydown', event => {
  if(event.key === 'Enter' && !locked) unlockButton.click();
  if(event.key === 'Escape') closePanel();
});
