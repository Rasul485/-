// script.js
// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      if (target.classList.contains('service-details')) {
        document.querySelectorAll('.service-details').forEach(detail => detail.classList.add('hidden'));
        target.classList.remove('hidden');
      }
    }
  });
});

// Анимация загрузки
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
  const preloader = document.getElementById("preloader");
  setTimeout(() => preloader.style.display = "none", 2000);
});

// Кнопка наверх
const toTopBtn = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) toTopBtn.classList.add("show");
  else toTopBtn.classList.remove("show");
});
toTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// AOS инициализация
AOS.init({ duration: 800, once: true });

// ScrollSpy
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav ul li a");
window.addEventListener("scroll", () => {
  let scrollY = window.pageYOffset;
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) link.classList.add("active");
      });
    }
  });
});

// Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Кастомный курсор
const cursor = document.querySelector(".custom-cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});
document.addEventListener("mousedown", () => cursor.style.transform = "scale(0.8)");
document.addEventListener("mouseup", () => cursor.style.transform = "scale(1)");

// Параллакс
document.addEventListener("scroll", () => {
  document.querySelectorAll(".parallax-item").forEach(item => {
    const speed = item.getAttribute("data-speed");
    const yPos = -(window.scrollY * speed);
    item.style.transform = `translateY(${yPos}px)`;
  });
});

// Интерактивные карточки
document.querySelectorAll(".interactive-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });
});

// Персонализация
const userName = localStorage.getItem("userName") || "Гость";
document.getElementById("hero-name").textContent = userName;
document.getElementById("user-name").textContent = userName;
document.getElementById("name").addEventListener("input", (e) => {
  localStorage.setItem("userName", e.target.value);
  document.getElementById("hero-name").textContent = e.target.value;
  document.getElementById("user-name").textContent = e.target.value;
  document.getElementById("personal-offer").classList.remove("hidden");
});

// Темная/светлая тема
const themeToggle = document.getElementById("theme-icon");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
  themeToggle.classList.toggle("fa-sun");
  themeToggle.classList.toggle("fa-moon");
});

// Режим новичков/профи
const noviceBtn = document.getElementById("mode-novice");
const proBtn = document.getElementById("mode-pro");
noviceBtn.addEventListener("click", () => {
  noviceBtn.classList.add("active");
  proBtn.classList.remove("active");
  document.querySelectorAll(".novice-text").forEach(el => el.classList.remove("hidden"));
  document.querySelectorAll(".pro-text").forEach(el => el.classList.add("hidden"));
});
proBtn.addEventListener("click", () => {
  proBtn.classList.add("active");
  noviceBtn.classList.remove("active");
  document.querySelectorAll(".pro-text").forEach(el => el.classList.remove("hidden"));
  document.querySelectorAll(".novice-text").forEach(el => el.classList.add("hidden"));
});

// Чат-бот
const botToggle = document.getElementById("bot-toggle");
const botBox = document.getElementById("bot-box");
const botResponse = document.getElementById("bot-response");
botToggle.addEventListener("click", () => botBox.classList.toggle("hidden"));
document.querySelectorAll(".bot-option").forEach(btn => {
  btn.addEventListener("click", () => {
    const action = btn.getAttribute("data-action");
    botResponse.textContent = action === "website" ? "Отлично, давайте создадим сайт! У вас есть дизайн?" : "Приложение — это круто! Какой функционал нужен?";
  });
});

// Калькулятор стоимости
document.getElementById("cost-calculator").addEventListener("submit", (e) => {
  e.preventDefault();
  const type = document.getElementById("calc-type").value;
  const deadline = document.getElementById("calc-deadline").value;
  const techs = Array.from(document.getElementById("calc-tech").selectedOptions).map(opt => opt.value);
  const basePrice = type === "website" ? 500 : type === "app" ? 800 : 1000;
  const techPrice = techs.length * 200;
  const deadlineFactor = deadline < 30 ? 1.5 : 1;
  const total = (basePrice + techPrice) * deadlineFactor;
  document.getElementById("calc-result").textContent = `Примерная стоимость: $${total.toFixed(2)}`;
});

// Портфолио фильтры
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.getAttribute("data-filter");
    document.querySelectorAll(".portfolio-card").forEach(card => {
      const category = card.getAttribute("data-category");
      card.style.display = filter === "all" || category === filter ? "block" : "none";
    });
  });
});

// До/После слайдер
document.querySelectorAll(".slider").forEach(slider => {
  slider.addEventListener("input", (e) => {
    const value = e.target.value;
    const before = slider.parentElement.querySelector(".before");
    const after = slider.parentElement.querySelector(".after");
    before.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
    after.style.clipPath = `inset(0 0 0 ${value}%)`;
  });
});

// Сравнение решений
document.querySelectorAll(".interactive-cell").forEach(cell => {
  cell.addEventListener("click", () => {
    document.getElementById("comparison-info").textContent = cell.getAttribute("data-info");
  });
});

// Переделка сайта
document.getElementById("redesign-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const url = document.getElementById("site-url").value;
  setTimeout(() => {
    document.getElementById("redesign-result").textContent = `Ваш сайт устарел на 75%. Рекомендуем: адаптивность, скорость, SEO.`;
  }, 1000);
});

// Процесс разработки (игра)
document.querySelectorAll(".game-step").forEach(step => {
  step.addEventListener("click", () => {
    const stepNum = step.getAttribute("data-step");
    const info = {
      1: "Анализируем ваши требования и цели.",
      2: "Создаем прототипы и дизайн.",
      3: "Разрабатываем интерфейс.",
      4: "Настраиваем серверную часть.",
      5: "Запускаем готовый продукт!"
    };
    document.getElementById("game-info").textContent = info[stepNum];
  });
});

// GitHub интеграция
fetch("https://api.github.com/users/xai-org/repos")
  .then(res => res.json())
  .then(data => {
    const reposGrid = document.getElementById("github-repos");
    data.slice(0, 3).forEach(repo => {
      const repoCard = document.createElement("div");
      repoCard.classList.add("repo-card");
      repoCard.innerHTML = `<h3>${repo.name}</h3><p>${repo.description || "No description"}</p><a href="${repo.html_url}" target="_blank" class="btn">Посмотреть</a>`;
      reposGrid.appendChild(repoCard);
    });
  });

// Умный бриф
document.getElementById("smart-brief").addEventListener("submit", (e) => {
  e.preventDefault();
  const type = document.getElementById("project-type").value;
  const existing = document.getElementById("existing").value;
  const budget = document.getElementById("budget").value;
  document.getElementById("brief-result").textContent = `ТЗ: ${type}, имеющееся: ${existing}, бюджет: $${budget}`;
  document.getElementById("badge").classList.remove("hidden");
  addPoints(20);
});

// Конструктор проекта
function calculateConstructor() {
  const type = document.getElementById("constructor-type").value;
  const design = document.getElementById("constructor-design").value;
  const features = document.getElementById("constructor-features").value;
  const price = (type === "website" ? 500 : 800) + (design === "modern" ? 200 : 100) + (features === "advanced" ? 300 : 100);
  document.getElementById("constructor-result").textContent = `Примерная стоимость: $${price}`;
}

// Технологии
document.querySelectorAll(".tech-card").forEach(card => {
  card.addEventListener("click", () => {
    const tech = card.getAttribute("data-tech");
    document.getElementById("tech-description").textContent = tech === "React" ? "React — для динамичных интерфейсов." : tech === "Node.js" ? "Node.js — для серверной логики." : "Figma — для дизайна.";
  });
});

// Геймификация
let points = 0;
function addPoints(amount) {
  points += amount;
  document.getElementById("loyalty-points").textContent = points;
}

document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.style.transform = "scale(1.1)";
    setTimeout(() => btn.style.transform = "scale(1)", 200);
  });
});

// Поиск
document.getElementById("search").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll("section").forEach(section => {
    const text = section.textContent.toLowerCase();
    section.style.display = text.includes(query) ? "block" : "none";
  });
});

// Панель достижений
document.querySelectorAll(".progress").forEach(bar => {
  const value = bar.getAttribute("data-value");
  bar.style.width = `${value}%`;
});

// Режим фокусировки
document.querySelectorAll(".focus-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const section = btn.closest(".section");
    document.body.classList.toggle("focus-mode");
    if (document.body.classList.contains("focus-mode")) {
      document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
      section.classList.remove("hidden");
    } else {
      document.querySelectorAll(".section").forEach(s => s.classList.remove("hidden"));
    }
  });
});

// Умный FAQ
document.getElementById("faq-search").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll(".faq-item").forEach(item => {
    const keywords = item.getAttribute("data-keywords").toLowerCase();
    const text = item.textContent.toLowerCase();
    item.classList.toggle("hidden", !(keywords.includes(query) || text.includes(query)));
  });
});

// Сравнитель проектов
const comparatorBtn = document.querySelector(".toggle-comparator");
const comparatorSides = document.querySelectorAll(".comparator-side");
comparatorBtn.addEventListener("click", () => {
  comparatorSides.forEach(side => {
    side.classList.toggle("hidden");
    setTimeout(() => side.classList.remove("hidden"), 500);
  });
});

// Динамическая карта прогресса
document.querySelectorAll(".map-node").forEach(node => {
  node.addEventListener("click", () => {
    const sectionId = node.getAttribute("data-section");
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
  });
});

// Оценка по эмоциям
document.querySelectorAll(".emotion-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const emotion = btn.getAttribute("data-emotion");
    document.getElementById("emotion-result").textContent = `Вы чувствуете: ${emotion === "happy" ? "радость" : emotion === "curious" ? "любопытство" : "смятение"}! Спасибо за обратную связь!`;
    addPoints(10);
  });
});