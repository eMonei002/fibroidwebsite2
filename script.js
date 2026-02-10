document.addEventListener('DOMContentLoaded', function () {
  const exitPopup = document.getElementById('exit-popup');
  const skipPopup = document.getElementById('skip-popup');
  const popupForm = document.getElementById('popupForm');
  const popupPhone = document.getElementById('popup-phone');

  // Helper: open + close
  function showExitPopup() {
    if (!exitPopup) return;
    // Only show if it's currently hidden
    if (getComputedStyle(exitPopup).display === 'none') {
      exitPopup.style.display = 'flex'; // matches your flex alignment
    }
  }

  function hideExitPopup() {
    if (!exitPopup) return;
    exitPopup.style.display = 'none';
  }

  // 1) Timed popup (e.g. 20 seconds)
  setTimeout(showExitPopup, 200000);

  // 2) Exit intent (desktop only)
  document.addEventListener('mouseleave', function (e) {
    if (e.clientY <= 0) {
      showExitPopup();
    }
  });

  // 3) "No thanks, continue browsing"
  if (skipPopup) {
    skipPopup.addEventListener('click', hideExitPopup);
  }

  // 4) Handle popup form submit
  if (popupForm) {
    popupForm.addEventListener('submit', async function (event) {
      event.preventDefault();

      const phone = popupPhone.value.trim();
      const phoneRegex = /^\d{11}$/;

      if (!phoneRegex.test(phone)) {
        alert('Phone number must be exactly 11 digits.');
        return;
      }

      try {
        const response = await fetch(popupForm.action, {
          method: popupForm.method,
          body: new FormData(popupForm),
          headers: { Accept: 'application/json' }
        });

        if (response.ok) {
          alert('Your free guide link will be sent shortly. Thank you!');
          hideExitPopup();
        } else {
          alert('Something went wrong. Please try again.');
        }
      } catch (err) {
        console.error(err);
        alert('Network error. Please try again.');
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  /* =========================
     1. FAKE ORDER POPUP
  ========================== */
  const fakeOrderPopup = document.getElementById('fake-order-popup');

  if (fakeOrderPopup) {
    const names = [
      "Aisha", "Chioma", "Blessing", "Grace", "Fatima",
      "Oluwaseun", "Amaka", "Rukayat", "Mercy", "Janet",
      "Toyin", "Halima", "Rose", "Stella", "Patience"
    ];

    const locations = [
      "Lagos", "Abuja", "Port Harcourt", "Ibadan", "Benin",
      "Enugu", "Kano", "Abeokuta", "Uyo", "Onitsha",
      "Ilorin", "Owerri", "Asaba", "Warri", "Akure"
    ];

    const packages = [
      "1 Bottle", "2 Bottles", "3 Bottles"
    ];

    function showFakeOrder() {
      const name = names[Math.floor(Math.random() * names.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      const pack = packages[Math.floor(Math.random() * packages.length)];

      fakeOrderPopup.textContent =
        `${name} from ${location} just ordered ${pack} of Fibroid Shrnk Solution Capsule.`;

      fakeOrderPopup.style.opacity = '1';

      // Hide after 5 seconds
      setTimeout(() => {
        fakeOrderPopup.style.opacity = '0';
      }, 5000);
    }

    // First fake order after 10s
    setTimeout(showFakeOrder, 10000);

    // Repeat every 30s
    setInterval(showFakeOrder, 30000);
  }

  /* =========================
     2. FAQ ACCORDION
  ========================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', () => {
      // Close others
      faqItems.forEach(i => {
        if (i !== item) i.classList.remove('active');
      });
      // Toggle this one
      item.classList.toggle('active');
    });
  });

  /* =========================
     3. COMMENTS – FAKE SEND
  ========================== */
  const commentInput = document.getElementById('comment-input');
  const commentBtn = document.getElementById('send-comment');
  const commentToast = document.getElementById('comment-toast');

  if (commentInput && commentBtn && commentToast) {
    commentBtn.addEventListener('click', () => {
      if (!commentInput.value.trim()) return;

      // Just show toast, no real saving
      commentToast.style.display = 'block';

      setTimeout(() => {
        commentToast.style.display = 'none';
      }, 3000);

      commentInput.value = '';
    });
  }

  /* =========================
     4. EXIT POPUP + FORMSPREE
  ========================== */
  const exitPopup = document.getElementById('exit-popup');
  const skipPopup = document.getElementById('skip-popup');
  const popupForm = document.getElementById('popupForm');

  let popupAlreadyShown = false;

  function showExitPopup() {
    if (!exitPopup || popupAlreadyShown) return;
    popupAlreadyShown = true;
    exitPopup.style.display = 'flex';
  }

  // Show when user moves mouse towards top (desktop)
  document.addEventListener('mouseout', function (e) {
    if (e.clientY < 10) {
      showExitPopup();
    }
  });

  // Show after some time (mobile users)
  setTimeout(showExitPopup, 45000); // 45s on page

  // Skip / close
  if (skipPopup && exitPopup) {
    skipPopup.addEventListener('click', () => {
      exitPopup.style.display = 'none';
    });
  }

  // Submit popup form via Formspree
  if (popupForm) {
    popupForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const phoneInput = document.getElementById('popup-phone');
      const phoneRegex = /^\d{11}$/;

      if (!phoneRegex.test(phoneInput.value.trim())) {
        alert('Phone number must be exactly 11 digits.');
        return;
      }

      try {
        const response = await fetch(this.action, {
          method: this.method,
          body: new FormData(this),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          alert('Thank you! Your free fibroid guide will be sent shortly.');
          exitPopup.style.display = 'none';
        } else {
          alert('Something went wrong. Please try again.');
        }
      } catch (err) {
        alert('Network error. Please check your connection and try again.');
      }
    });
  }

  /* =========================
     5. COUNTDOWN TIMER (OPTIONAL)
     For the "Limited-Time Offer"
  ========================== */
  const countdownEl = document.getElementById('countdown');

  if (countdownEl) {
    // 24-hour countdown from page load
    const now = new Date().getTime();
    const endTime = now + 24 * 60 * 60 * 1000; // +24 hours

    function updateCountdown() {
      const current = new Date().getTime();
      const distance = endTime - current;

      if (distance <= 0) {
        countdownEl.textContent = "Offer expires soon – hurry!";
        return;
      }

      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      countdownEl.textContent =
        `Offer ends in ${hours}h : ${minutes}m : ${seconds}s`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
});
