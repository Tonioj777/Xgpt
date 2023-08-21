var swiper = new Swiper('.article__swiper', {
  navigation: {
    nextEl: ".testimonials__arrow-next",
    prevEl: ".testimonials__arrow-prev",
  },
  pagination: {
    el: '.article__bullets',
    clickable: true,

  },
});

// IFRAME----------------------------

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

// TABS------------------------

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


// TIMER----------------

const dom = {
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds'),
};

const addTime = 1000 * 60 * 60 * 24 * 7;
const finishTime = Date.now() + addTime + (1000);

const finish = setInterval(() => {
  const timeNow = Date.now();
  const timer = finishTime - timeNow;

  if (timer <= 0) {
    clearInterval(finish);
  } else {
    const formattedTime = getFormattedTime(timer);
    renderTime(formattedTime, dom);
    changeCircleSegment(formattedTime, dom);
  }
}, 1000);

// Получение сохраненного времени из localStorage
// let savedTime = localStorage.getItem('finishTime');
// if (savedTime) {
//   savedTime = parseInt(savedTime, 10);
// } else {
//   // Если нет сохраненного времени, устанавливаем новое время
//   savedTime = Date.now() + 1000 * 60 * 60 * 24 * 7 + 1000;
//   localStorage.setItem('finishTime', savedTime);
// }

// const finish = setInterval(() => {
//   const timeNow = Date.now();
//   const timer = savedTime - timeNow;

//   if (timer < 0) {
//     clearInterval(finish);
//     localStorage.removeItem('finishTime'); // Очищаем сохраненное время
//   } else {
//     const formattedTime = getFormattedTime(timer);
//     renderTime(formattedTime, dom);
//     changeCircleSegment(formattedTime, dom);
//   }
// }, 1000);

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

var swiper = new Swiper('.testimonials__slider', {
  slidesPerView: 1, // Показывать только один слайд
  spaceBetween: 30, // Расстояние между слайдами
  speed: 1000,
  autoHeight: true,
  effect: "fade",
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
// $('.header__burger, .overlay').on('click', function (e) {
//   e.preventDefault()
//   $('.header__menu').toggleClass('header__menu--active')
//   $('.overlay').toggleClass('overlay--show')
//   $('.header__burger').toggleClass('open')


// })

const overlay = document.querySelector('.overlay');
const headerBurger = document.querySelector('.header__burger');
const headerMenu = document.querySelector('.header__menu');

overlay.addEventListener('click', function (e) {
    e.preventDefault();
    headerMenu.classList.remove('header__menu--active');
    overlay.classList.remove('overlay--show');
    headerBurger.classList.remove('header__burger--open');
    document.body.classList.remove('lock'); // Удаляем класс lock при закрытии меню
});

headerBurger.addEventListener('click', function (e) {
    e.preventDefault();
    headerBurger.classList.toggle('header__burger--open');
    headerMenu.classList.toggle('header__menu--active');
    overlay.classList.toggle('overlay--show');
    document.body.classList.toggle('lock'); // Добавляем или убираем класс lock при открытии меню
});

