/* ============================================
   SCRIPT.JS - Zavira Haramain Landing Page
   JavaScript sederhana tanpa library eksternal.
   ============================================ */


/* === HAMBURGER MENU (MOBILE) === */
// Membuka dan menutup menu navigasi di tampilan mobile
const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbarMenu');

if (hamburger && navbarMenu) {
  hamburger.addEventListener('click', function () {
    // Toggle class 'active' untuk animasi hamburger dan tampilan menu
    hamburger.classList.toggle('active');
    navbarMenu.classList.toggle('active');
  });

  // Menutup menu saat salah satu link diklik
  const navLinks = navbarMenu.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      navbarMenu.classList.remove('active');
    });
  });
}


/* === SMOOTH SCROLL === */
// Membuat navigasi scroll secara halus ke section tujuan
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Hitung posisi dengan offset navbar (68px)
      const offsetTop = targetElement.offsetTop - 68;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});


/* === ANIMASI SAAT SCROLL === */
// Menampilkan elemen secara perlahan saat masuk viewport
// Menggunakan IntersectionObserver API (bawaan browser)
const animateElements = document.querySelectorAll('.animate-on-scroll');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Tambahkan class 'visible' untuk memicu animasi CSS
        entry.target.classList.add('visible');
        // Berhenti mengamati setelah animasi dimainkan
        observer.unobserve(entry.target);
      }
    });
  }, {
    // Elemen mulai terlihat saat 15% masuk viewport
    threshold: 0.15
  });

  animateElements.forEach(function (el) {
    observer.observe(el);
  });
} else {
  // Fallback: langsung tampilkan semua jika browser tidak mendukung
  animateElements.forEach(function (el) {
    el.classList.add('visible');
  });
}


/* === FALLBACK GAMBAR === */
// Menangani gambar yang gagal dimuat
// Menampilkan pesan pengganti agar layout tidak rusak
document.querySelectorAll('img').forEach(function (img) {
  img.addEventListener('error', function () {
    // Sembunyikan gambar yang gagal
    this.style.display = 'none';

    // Cek apakah ini foto profil (class tim-photo)
    const isProfile = this.classList.contains('tim-photo');
    const fallbackClass = isProfile ? 'img-fallback img-fallback-foto' : 'img-fallback';
    const fallbackText = isProfile ? '👤' : '🖼️<br><small>Gambar belum ditambahkan</small>';

    // Buat elemen fallback
    const fallback = document.createElement('div');
    fallback.className = fallbackClass;
    fallback.innerHTML = fallbackText;

    // Gantikan gambar dengan fallback
    this.parentNode.insertBefore(fallback, this);
  });
});


/* === NAVBAR BERUBAH SAAT SCROLL === */
// Menambahkan efek shadow lebih tebal saat halaman di-scroll
const navbar = document.getElementById('navbar');

if (navbar) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 2px 16px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = '0 1px 8px rgba(0, 0, 0, 0.06)';
    }
  });
}