/* ==========================================================================
   Eviston House Hotel - Interactive Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Hamburger Toggle Logic
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // Sticky Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Room Filter Switcher
  const filterBtns = document.querySelectorAll('.tab-btn');
  const roomCards = document.querySelectorAll('.room-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      roomCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Booking Form Submission & Toast Notification
  const bookingForm = document.getElementById('bookingForm');
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const roomType = document.getElementById('roomType').value;
    const guests = document.getElementById('guests').value;

    if (!checkin || !checkout) {
      showToast('Please select valid check-in and check-out dates.');
      return;
    }

    showToast(`Checking live rates for ${roomType} (${guests} Guests): ${checkin} to ${checkout}...`);

    setTimeout(() => {
      openModal('Booking Engine Connected', `
        <p style="margin-bottom:1rem; color: var(--color-text-muted);">Thank you for choosing Eviston House Hotel. Your live booking session is reserved:</p>
        <div style="background:rgba(255,255,255,0.05); padding:1.25rem; border-left:3px solid var(--color-accent-gold); margin-bottom:1.5rem;">
          <p style="color:#FFF;"><strong>Room:</strong> ${roomType}</p>
          <p style="color:#FFF;"><strong>Dates:</strong> ${checkin} to ${checkout}</p>
          <p style="color:#FFF;"><strong>Guests:</strong> ${guests}</p>
          <p style="color:var(--color-accent-gold); margin-top:0.5rem;"><strong>Best Rate Guarantee Applied</strong></p>
        </div>
        <button class="btn-gold" style="width:100%" onclick="closeModal()">Proceed to Secure Payment</button>
      `);
    }, 800);
  });

  // Modal Functions
  window.openModal = function(title, contentHtml) {
    const modal = document.getElementById('globalModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    modalTitle.textContent = title;
    modalBody.innerHTML = contentHtml;
    modal.classList.add('active');
  };

  window.closeModal = function() {
    const modal = document.getElementById('globalModal');
    modal.classList.remove('active');
  };

  // Toast Function
  window.showToast = function(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  };
});
