/* ==========================================================================
   Killeen House Hotel - Interactive Application Logic
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

  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  const bookingForm = document.getElementById('bookingForm');
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const room = document.getElementById('roomCategory').value;
    const guests = document.getElementById('guests').value;

    showToast(`Checking Killeen House & Golf Package availability...`);

    setTimeout(() => {
      openModal('Estate & Rozzers Direct Reservation', `
        <p style="margin-bottom:1rem; color: var(--color-text-muted);">Thank you for choosing Killeen House Hotel. Your country house reservation details:</p>
        <div style="background:rgba(197,160,89,0.08); padding:1.25rem; border-left:3px solid var(--color-accent-gold); margin-bottom:1.5rem;">
          <p style="color:#FFF;"><strong>Accommodation:</strong> ${room}</p>
          <p style="color:#FFF;"><strong>Dates:</strong> ${checkin} to ${checkout}</p>
          <p style="color:#FFF;"><strong>Guests:</strong> ${guests}</p>
          <p style="color:var(--color-accent-gold); margin-top:0.5rem;"><strong>Includes Rozzers Fine Dining Priority Table & Complimentary Golf Ball Trade Pint!</strong></p>
        </div>
        <button class="btn-gold" style="width:100%" onclick="closeModal()">Proceed to Booking Confirmation</button>
      `);
    }, 700);
  });

  window.openModal = function(title, contentHtml) {
    const modal = document.getElementById('globalModal');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = contentHtml;
    modal.classList.add('active');
  };

  window.closeModal = function() {
    document.getElementById('globalModal').classList.remove('active');
  };

  window.showToast = function(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 4000);
  };
});
