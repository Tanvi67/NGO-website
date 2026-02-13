// Website JavaScript Code

// Number Counter
const numbers = document.querySelectorAll('.counter');

const numberWatcher = new IntersectionObserver((items) => {
  items.forEach(item => {
    if (item.isIntersecting) {
      const number = item.target;
      const targetNum = +number.dataset.target;
      let currentNum = 0;
      const time = 2000;
      const stepSize = targetNum / (time / 16);

      const countUp = () => {
        currentNum += stepSize;
        if (currentNum < targetNum) {
          number.innerText = Math.floor(currentNum);
          requestAnimationFrame(countUp);
        } else {
          number.innerText = targetNum;
        }
      };

      countUp();
      numberWatcher.unobserve(number);
    }
  });
}, { threshold: 0.5 });

numbers.forEach(number => numberWatcher.observe(number));

// Menu Scroll Effect
const menu = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
    menu.classList.add('scrolled');
  } else {
    menu.classList.remove('scrolled');
  }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const linkHref = this.getAttribute('href');
    if (linkHref !== '#' && linkHref !== '') {
      e.preventDefault();
      const targetSection = document.querySelector(linkHref);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Back to Top Button
const topBtn = document.querySelector('.back-to-top');

if (topBtn) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      topBtn.classList.add('show');
    } else {
      topBtn.classList.remove('show');
    }
  });

  topBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Form Validation
const allForms = document.querySelectorAll('form');

allForms.forEach(form => {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isOk = true;
    const fields = form.querySelectorAll('input[required], textarea[required], select[required]');

    fields.forEach(field => {
      field.classList.remove('is-invalid', 'is-valid');

      if (!field.value.trim()) {
        field.classList.add('is-invalid');
        isOk = false;

        if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('invalid-feedback')) {
          const errorBox = document.createElement('div');
          errorBox.className = 'invalid-feedback';
          errorBox.style.display = 'block';
          errorBox.textContent = 'This field is required';
          field.parentNode.appendChild(errorBox);
        }
      } else {
        if (field.type === 'email') {
          const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailCheck.test(field.value)) {
            field.classList.add('is-invalid');
            isOk = false;

            if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('invalid-feedback')) {
              const errorBox = document.createElement('div');
              errorBox.className = 'invalid-feedback';
              errorBox.style.display = 'block';
              errorBox.textContent = 'Please enter valid email';
              field.parentNode.appendChild(errorBox);
            }
          } else {
            field.classList.add('is-valid');
          }
        } else {
          field.classList.add('is-valid');
        }
      }
    });

    if (isOk) {
      alert('Form submitted! Thank you.');
      form.reset();
      fields.forEach(field => {
        field.classList.remove('is-invalid', 'is-valid');
      });
    }
  });

  const fields = form.querySelectorAll('input, textarea, select');
  fields.forEach(field => {
    field.addEventListener('blur', function () {
      if (this.hasAttribute('required')) {
        this.classList.remove('is-invalid', 'is-valid');

        if (!this.value.trim()) {
          this.classList.add('is-invalid');
        } else if (this.type === 'email') {
          const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailCheck.test(this.value)) {
            this.classList.add('is-valid');
          } else {
            this.classList.add('is-invalid');
          }
        } else {
          this.classList.add('is-valid');
        }
      }
    });
  });
});

// Lazy Load Images
const pics = document.querySelectorAll('img[data-src]');

const picWatcher = new IntersectionObserver((items) => {
  items.forEach(item => {
    if (item.isIntersecting) {
      const pic = item.target;
      pic.src = pic.dataset.src;
      pic.removeAttribute('data-src');
      picWatcher.unobserve(pic);
    }
  });
});

pics.forEach(pic => picWatcher.observe(pic));

// Active Menu Link
const currentPageName = window.location.pathname.split('/').pop() || 'index.html';
const menuLinks = document.querySelectorAll('.nav-link');

menuLinks.forEach(link => {
  const linkPage = link.getAttribute('href');
  if (linkPage === currentPageName) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

// Loading Bar Animation
const loadingBars = document.querySelectorAll('.progress-bar');

const barWatcher = new IntersectionObserver((items) => {
  items.forEach(item => {
    if (item.isIntersecting) {
      const bar = item.target;
      const barWidth = bar.dataset.width || bar.style.width;
      bar.style.width = barWidth;
      barWatcher.unobserve(bar);
    }
  });
}, { threshold: 0.5 });

loadingBars.forEach(bar => {
  const targetWidth = bar.style.width;
  bar.dataset.width = targetWidth;
  bar.style.width = '0%';
  barWatcher.observe(bar);
});

// Mobile Menu Close
const menuToggle = document.querySelector('.navbar-toggler');
const menuBox = document.querySelector('.navbar-collapse');

if (menuToggle && menuBox) {
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menuBox.classList.contains('show')) {
        menuToggle.click();
      }
    });
  });
}

// Tooltips
const tooltipItems = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipArray = [...tooltipItems].map(item => new bootstrap.Tooltip(item));

// Stories Carousel - Make sure all stories show
const storyCarousel = document.getElementById('storySlider');
if (storyCarousel) {
  const carousel = new bootstrap.Carousel(storyCarousel, {
    interval: 5000,
    ride: 'carousel',
    wrap: true
  });
}

console.log('Website loaded');
