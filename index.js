(() => {
  "use strict";

  const START_DATE = new Date("2025-07-23T09:00:00-03:00");
  const BIRTHDAY_DATE = new Date("2026-10-09T00:00:00-03:00");
  const STORAGE_KEY = "lm-home-audio";

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

  const pad = (value) => String(Math.max(0, value)).padStart(2, "0");

  function daysInMonth(year, monthIndex) {
    return new Date(year, monthIndex + 1, 0).getDate();
  }

  function addCalendarYears(date, amount) {
    const result = new Date(date);
    const targetYear = result.getFullYear() + amount;
    const targetMonth = result.getMonth();
    const targetDay = Math.min(result.getDate(), daysInMonth(targetYear, targetMonth));
    result.setFullYear(targetYear, targetMonth, targetDay);
    return result;
  }

  function addCalendarMonths(date, amount) {
    const result = new Date(date);
    const originalDay = result.getDate();
    const firstOfTarget = new Date(result.getFullYear(), result.getMonth() + amount, 1, result.getHours(), result.getMinutes(), result.getSeconds(), result.getMilliseconds());
    const targetDay = Math.min(originalDay, daysInMonth(firstOfTarget.getFullYear(), firstOfTarget.getMonth()));
    firstOfTarget.setDate(targetDay);
    return firstOfTarget;
  }

  function calculateElapsed(from, to) {
    if (to < from) {
      return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    let cursor = new Date(from);
    let years = to.getFullYear() - cursor.getFullYear();
    let candidate = addCalendarYears(cursor, years);

    if (candidate > to) {
      years -= 1;
      candidate = addCalendarYears(cursor, years);
    }

    cursor = candidate;

    let months = to.getMonth() - cursor.getMonth() + ((to.getFullYear() - cursor.getFullYear()) * 12);
    candidate = addCalendarMonths(cursor, months);

    if (candidate > to) {
      months -= 1;
      candidate = addCalendarMonths(cursor, months);
    }

    cursor = candidate;

    let remaining = to.getTime() - cursor.getTime();
    const dayMs = 24 * 60 * 60 * 1000;
    const hourMs = 60 * 60 * 1000;
    const minuteMs = 60 * 1000;
    const secondMs = 1000;

    const days = Math.floor(remaining / dayMs);
    remaining -= days * dayMs;

    const hours = Math.floor(remaining / hourMs);
    remaining -= hours * hourMs;

    const minutes = Math.floor(remaining / minuteMs);
    remaining -= minutes * minuteMs;

    const seconds = Math.floor(remaining / secondMs);

    return { years, months, days, hours, minutes, seconds };
  }

  function runValueAnimation(element, animationClass) {
    if (!element) return;
    element.classList.remove(animationClass);
    void element.offsetWidth;
    element.classList.add(animationClass);
  }

  let lastRelationship = null;

  function updateRelationshipCounter() {
    const now = new Date();
    const elapsed = calculateElapsed(START_DATE, now);

    const map = {
      years: elapsed.years,
      months: elapsed.months,
      days: elapsed.days,
      hours: elapsed.hours,
      minutes: elapsed.minutes,
      seconds: elapsed.seconds
    };

    Object.entries(map).forEach(([unit, value]) => {
      const element = qs(`#${unit}`);
      if (!element) return;

      const formatted = pad(value);
      if (element.textContent !== formatted) {
        const animation = {
          years: "tick-year",
          months: "tick-month",
          days: "tick-hour",
          hours: "tick-hour",
          minutes: "tick-minute",
          seconds: "tick-second"
        }[unit];

        element.textContent = formatted;
        runValueAnimation(element, animation);
      }
    });

    lastRelationship = elapsed;
  }

  function updateBirthdayCountdown() {
    const now = new Date();
    const difference = BIRTHDAY_DATE.getTime() - now.getTime();

    const headline = qs("#birthdayHeadline");
    const subhead = qs("#birthdaySubhead");
    const liveBox = qs("#birthdayToday");
    const countdown = qs(".birthday-countdown");

    if (difference <= 0) {
      if (countdown) countdown.hidden = true;
      if (liveBox) liveBox.hidden = false;
      if (headline) headline.innerHTML = "HOJE É O SEU DIA.<br /><em>Feliz 16, Miguel.</em>";
      if (subhead) subhead.textContent = "09 de outubro de 2026 · o dia em que Miguel completa 16 anos.";
      return;
    }

    if (countdown) countdown.hidden = false;
    if (liveBox) liveBox.hidden = true;

    let remaining = Math.floor(difference / 1000);
    const days = Math.floor(remaining / 86400);
    remaining -= days * 86400;
    const hours = Math.floor(remaining / 3600);
    remaining -= hours * 3600;
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;

    const values = {
      bDays: pad(days),
      bHours: pad(hours),
      bMinutes: pad(minutes),
      bSeconds: pad(seconds)
    };

    Object.entries(values).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (!element) return;
      if (element.textContent !== value) {
        element.textContent = value;
        runValueAnimation(element, "birth-tick");
      }
    });
  }

  function setupScrollReveal() {
    const elements = qsa(".reveal");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    elements.forEach((element) => observer.observe(element));
  }

  function setupPhotoFallback() {
    const image = qs("#homePhoto");
    const placeholder = qs("#photoPlaceholder");
    if (!image || !placeholder) return;

    const showPlaceholder = () => {
      image.style.opacity = "0";
      placeholder.hidden = false;
    };

    image.addEventListener("load", () => {
      image.style.opacity = "1";
      placeholder.hidden = true;
    });

    image.addEventListener("error", showPlaceholder);

    if (image.complete && image.naturalWidth > 0) {
      placeholder.hidden = true;
    } else if (image.complete && image.naturalWidth === 0) {
      showPlaceholder();
    }
  }

  function createBirthdayConfetti() {
    const container = qs("#confetti");
    if (!container) return;

    const pieces = 92;
    for (let i = 0; i < pieces; i++) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.setProperty("--duration", `${3.3 + Math.random() * 3.9}s`);
      piece.style.setProperty("--drift", `${-150 + Math.random() * 300}px`);
      piece.style.animationDelay = `${Math.random() * 0.65}s`;
      piece.style.background = [
        "#a36cff",
        "#c39cff",
        "#ff78b7",
        "#f8f2ff",
        "#7c4ae8"
      ][Math.floor(Math.random() * 5)];
      piece.style.width = `${4 + Math.random() * 6}px`;
      piece.style.height = `${8 + Math.random() * 13}px`;
      container.appendChild(piece);
    }

    window.setTimeout(() => {
      container.replaceChildren();
    }, 7200);
  }

  function setupParticleCanvas() {
    const canvas = qs("#particleCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let width = 0;
    let height = 0;
    let particles = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(72, Math.max(28, Math.floor(width / 22)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.7 + Math.random() * 1.8,
        a: 0.12 + Math.random() * 0.34,
        s: 0.08 + Math.random() * 0.22,
        d: Math.random() * Math.PI * 2
      }));
    };

    const frame = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.y -= p.s;
        p.d += 0.003;
        p.x += Math.sin(p.d) * 0.09;

        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.fillStyle = `rgba(208, 180, 255, ${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    frame();
  }

  function setupMusic() {
    const audio = qs("#bgMusic");
    const button = qs("#musicToggle");
    const label = qs("#musicLabel");
    if (!audio || !button) return;

    let muted = localStorage.getItem(STORAGE_KEY) === "muted";

    const updateUI = () => {
      const playing = !audio.paused && !audio.ended && audio.currentTime > 0;
      button.classList.toggle("is-playing", playing);
      button.setAttribute("aria-pressed", String(playing));
      if (label) label.textContent = playing ? "TOCANDO" : "MÚSICA";
    };

    if (muted) {
      audio.pause();
    } else {
      audio.volume = 0.46;
      audio.play().catch(() => {
        // Navegadores podem bloquear autoplay. A primeira interação tenta novamente.
      });
    }

    button.addEventListener("click", async () => {
      if (audio.paused) {
        try {
          await audio.play();
          localStorage.setItem(STORAGE_KEY, "playing");
        } catch {
          // Sem ação adicional necessária; o botão continua disponível.
        }
      } else {
        audio.pause();
        localStorage.setItem(STORAGE_KEY, "muted");
      }
      updateUI();
    });

    const retry = () => {
      if (!muted && audio.paused) {
        audio.play().then(updateUI).catch(() => {});
      }
      window.removeEventListener("pointerdown", retry);
      window.removeEventListener("keydown", retry);
      window.removeEventListener("touchstart", retry);
    };

    window.addEventListener("pointerdown", retry, { once: true, passive: true });
    window.addEventListener("keydown", retry, { once: true });
    window.addEventListener("touchstart", retry, { once: true, passive: true });

    audio.addEventListener("play", updateUI);
    audio.addEventListener("pause", updateUI);
    updateUI();
  }

  function setupBirthdayTrigger() {
    const triggeredKey = "lm-birthday-confetti-2026";
    const now = new Date();
    const isBirthday = now >= BIRTHDAY_DATE;

    if (isBirthday && sessionStorage.getItem(triggeredKey) !== "done") {
      sessionStorage.setItem(triggeredKey, "done");
      window.setTimeout(createBirthdayConfetti, 350);
    }
  }

  function startTimers() {
    updateRelationshipCounter();
    updateBirthdayCountdown();

    window.setInterval(updateRelationshipCounter, 1000);
    window.setInterval(updateBirthdayCountdown, 1000);
  }

  function init() {
    setupScrollReveal();
    setupPhotoFallback();
    setupParticleCanvas();
    setupMusic();
    setupBirthdayTrigger();
    startTimers();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
