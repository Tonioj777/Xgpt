var swiper = new Swiper('.article__swiper', {
  autoHeight: true,
  loop: true,
  autoplay: {
    delay: 2000,
    pauseOnMouseEnter: true,
  },
  speed: 2000, 
  autoplayStopOnLast: false,
  disableOnInteraction: false, 

  navigation: {
    nextEl: ".testimonials__arrow-next",
    prevEl: ".testimonials__arrow-prev",
  },
  pagination: {
    el: '.article__bullets',
    clickable: true,
  },
  on: {
    init() {
      this.el.addEventListener('mouseenter', () => {
        this.autoplay.stop();
      });

      this.el.addEventListener('mouseleave', () => {
        this.autoplay.start();
      });
    }
  },
});





// ==================================Video=========================================


window.addEventListener('DOMContentLoaded', function () {
  var videoContainer = document.querySelector('.review__video-container');
  videoContainer.addEventListener('click', function () {
    if (videoContainer.classList.contains('ready')) {
      return;
    }
    videoContainer.classList.add('ready')
    videoContainer.insertAdjacentHTML('afterbegin', '<iframe src="https://www.youtube.com/embed/PYLgDNxfNWI?autoplay=1&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture;allow=autoplay  web-share" allowfullscreen></iframe>')
  });
});

// ==================================Tabs=========================================

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".seo__tabs-item");
  const contentItems = document.querySelectorAll(".seo__content-item");

  tabs.forEach(tab => {
    tab.addEventListener("click", function (event) {
      event.preventDefault(); // Отмена дефолтного поведения ссылки
      tabs.forEach(t => t.classList.remove("seo__tabs-item--active"));
      tab.classList.add("seo__tabs-item--active");

      const tabId = tab.getAttribute("href");
      contentItems.forEach(item => item.classList.remove("tab__content--active"));
      document.querySelector(tabId).classList.add("tab__content--active");
    });
  });
});

// ==================================Timer=========================================

const dom = {
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds'),
};

// Получение сохраненного времени из localStorage
let savedTime = localStorage.getItem('finishTime');
if (savedTime) {
  savedTime = parseInt(savedTime, 10);
} else {
  // Если нет сохраненного времени, устанавливаем новое время
  savedTime = Date.now() + 1000 * 60 * 60 * 24 * 7;
  localStorage.setItem('finishTime', savedTime);
}

// Добавляем один день (1 день * 24 часа * 60 минут * 60 секунд * 1000 миллисекунд)
// const additionalDays = 2;
// savedTime += additionalDays * 24 * 60 * 60 * 1000;

// Вычитаем один день (1 день * 24 часа * 60 минут * 60 секунд * 1000 миллисекунд)
// const subtractDays = 1;
// savedTime -= subtractDays * 24 * 60 * 60 * 1000;

const finish = setInterval(() => {
  const timeNow = Date.now();
  const timer = savedTime - timeNow;

  if (timer < 0) {
    clearInterval(finish);
    localStorage.removeItem('finishTime'); // Очищаем сохраненное время
  } else {
    const formattedTime = getFormattedTime(timer);
    renderTime(formattedTime, dom);
    changeCircleSegment(formattedTime, dom);
  }
}, 1000);

function getFormattedTime(time) {
  const formattedTime = {
    days: Math.floor(time / (1000 * 60 * 60 * 24)),
    hours: Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((time % (1000 * 60)) / 1000),
  };
  return formattedTime;
}

function renderTime(timeData, dom) {
  Object.keys(timeData).forEach(key => {
    const segment = dom[key].querySelector('.segment');
    dom[key].querySelector('.tariff__counter__name').textContent = timeData[key];
    changeCircleSegment(segment, key, timeData[key]);
  });
}

function changeCircleSegment(elem, key, value) {
  const style = elem.style;

  if (['seconds', 'minutes'].includes(key)) {
    style.strokeDasharray = `${value} 60`;
    style.strokeLinecap = value ? 'round' : 'initial';
  } else if (key === 'hours') {
    const segment = 60 / 24 * value;
    style.strokeDasharray = `${segment} 60`;
    style.strokeLinecap = value ? 'round' : 'initial';
  } else if (key === 'days') {
    const segment = 60 / 7 * value;
    style.strokeDasharray = `${segment} 60`;
    style.strokeLinecap = value ? 'round' : 'initial';
  }
}

// ==================================Slider=========================================


var swiper = new Swiper('.testimonials__slider', {
  autoplay: {
    disableOnInteraction: true,
    delay: 2000,
  },
  autoplayStopOnLast: false,
  slidesPerView: 1,
  spaceBetween: 30,
  speed: 1500,
  autoHeight: true,
  // effect: "zoom",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
var sliderContainer = document.querySelector('.testimonials__slider');
sliderContainer.addEventListener('mouseenter', function() {
  swiper.autoplay.stop();
});

sliderContainer.addEventListener('mouseleave', function() {
  swiper.autoplay.start();
});

// ==================================mobileMenu=========================================

const overlay = document.querySelector('.overlay');
const headerBurger = document.querySelector('.header__burger');
const headerMenu = document.querySelector('.header__menu');

overlay.addEventListener('click', function (e) {
  e.preventDefault();
  headerMenu.classList.remove('header__menu--active');
  overlay.classList.remove('overlay--show');
  headerBurger.classList.remove('header__burger--open');
  document.body.classList.remove('lock');
});

headerBurger.addEventListener('click', function (e) {
  e.preventDefault();
  headerBurger.classList.toggle('header__burger--open');
  headerMenu.classList.toggle('header__menu--active');
  overlay.classList.toggle('overlay--show');
  document.body.classList.toggle('lock');
});

// ==========================smothScroll====================================

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".header__menu-links, .header__nav-links, .footer__questions-link");

  links.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const startPos = window.pageYOffset;
        const targetPos = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const distance = targetPos - startPos;
        const duration = 1000; // Продолжительность анимации в миллисекундах
        let startTime = null;

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          const progress = timestamp - startTime;

          window.scrollTo(0, easeInOutCubic(progress, startPos, distance, duration));

          if (progress < duration) {
            requestAnimationFrame(step);
          }
        }

        requestAnimationFrame(step);
      }
    });
  });

  // Добавление паддинга к секции при скролле
  const sectionWithPadding = document.querySelector("use, options"); // Замените на ID вашей секции
  const paddingValue = 1100; // Значение паддинга в пикселях

  function updateSectionPadding() {
    if (sectionWithPadding) {
      const currentScroll = window.pageYOffset;
      const sectionTop = sectionWithPadding.getBoundingClientRect().top + currentScroll;

      if (currentScroll >= sectionTop) {
        sectionWithPadding.style.paddingTop = `${paddingValue}px`;
      } else {
        sectionWithPadding.style.paddingTop = "0";
      }
    }
  }

  window.addEventListener("scroll", updateSectionPadding);
});

function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t * t + b;
  t -= 2;
  return c / 2 * (t * t * t + 2) + b;
}

// ===========================closeMobileMenu=================================

document.addEventListener('click', function (event) {
  const clickedElement = event.target;

  if (
    clickedElement.classList.contains('header__menu-links')

  ) {
    const menuMobile = document.querySelector('.header__menu');
    const headerBurger = document.querySelector('.header__burger');
    const overlay = document.querySelector('.overlay');
    const body = document.body;

    if (menuMobile.classList.contains('header__menu--active')) {
      menuMobile.classList.remove('header__menu--active');
      headerBurger.classList.remove('header__burger--open');
      overlay.classList.remove('overlay--show');
      body.classList.remove('lock');
    }
  }
});
