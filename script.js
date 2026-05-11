/* ============================================
   SCRIPT.JS — Zavira Haramain

   Fitur yang dijalankan:
   1. Hamburger menu untuk mobile
   2. Smooth scroll saat klik menu navbar
   3. Animasi elemen saat discroll
   4. Fallback gambar jika gagal dimuat
   ============================================ */

// Tunggu HTML selesai dimuat
document.addEventListener('DOMContentLoaded', function () {

    /* ================================
       1. HAMBURGER MENU (MOBILE)
       Saat tombol diklik, menu muncul/hilang
       dan ikon berubah menjadi X
       ================================ */
    var hamburger = document.getElementById('navbarHamburger');
    var navMenu = document.getElementById('navbarMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('show');
        });
    }

    /* ================================
       2. SMOOTH SCROLL
       Saat link menu diklik, halaman
       scroll halus ke section tujuan
       ================================ */
    var menuLinks = document.querySelectorAll('.navbar-menu a');

    menuLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            var href = this.getAttribute('href');

            // Hanya proses link yang dimulai dengan #
            if (href && href.charAt(0) === '#') {
                // Cegah loncatan default
                event.preventDefault();

                var target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }

                // Tutup menu mobile setelah klik
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('show');
                }
            }
        });
    });

    /* ================================
       3. ANIMASI SCROLL
       Elemen dengan class 'animate-on-scroll'
       muncul (fade-in + slide-up) saat
       masuk ke area layar (viewport)

       Menggunakan Intersection Observer
       yang lebih efisien dari scroll event
       ================================ */
    var animatedElements = document.querySelectorAll('.animate-on-scroll');

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Hentikan pemantauan (animasi hanya sekali)
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    animatedElements.forEach(function (el) {
        observer.observe(el);
    });

    /* ================================
       4. FALLBACK GAMBAR UMUM
       Jika gambar gagal dimuat, tampilkan
       pesan fallback agar layout tidak rusak
       ================================ */
    var allImages = document.querySelectorAll('img');

    allImages.forEach(function (img) {
        img.addEventListener('error', function () {
            var altText = this.getAttribute('alt') || 'Gambar belum ditambahkan';
            var fallback = document.createElement('div');
            fallback.className = 'img-fallback';
            fallback.innerHTML =
                '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' +
                '<rect x="3" y="3" width="18" height="18" rx="2"/>' +
                '<circle cx="8.5" cy="8.5" r="1.5"/>' +
                '<path d="M21 15l-5-5L5 21"/>' +
                '</svg>' + altText;
            this.parentNode.replaceChild(fallback, this);
        });
    });

    /* ================================
       5. FALLBACK FOTO TIM
       Khusus foto profil anggota tim
       ================================ */
    var teamPhotos = document.querySelectorAll('.team-photo');

    teamPhotos.forEach(function (photo) {
        photo.addEventListener('error', function () {
            var fallback = document.createElement('div');
            fallback.className = 'photo-fallback';
            fallback.innerHTML = '&#128100;';
            this.parentNode.replaceChild(fallback, this);
        });
    });

});