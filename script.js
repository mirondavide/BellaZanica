// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Cookie Consent =====
const MAPS_SRC = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.7!2d9.6844!3d45.6447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4781512e5e8e1b1d%3A0x1234567890abcdef!2sPiazza%20XI%20Febbraio%2C%204%2C%2024050%20Zanica%20BG!5e0!3m2!1sit!2sit!4v1234567890';

function getCookieConsent() {
  return localStorage.getItem('cookieConsent');
}

function loadGoogleMaps() {
  var container = document.getElementById('map-container');
  if (!container) return;
  var placeholder = document.getElementById('map-placeholder');
  if (placeholder) placeholder.remove();
  if (!container.querySelector('iframe')) {
    var iframe = document.createElement('iframe');
    iframe.src = MAPS_SRC;
    iframe.title = 'Bella Zanica - Mappa';
    iframe.width = '100%';
    iframe.height = '400';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    container.appendChild(iframe);
  }
}

function setCookieConsent(accepted) {
  localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'rejected');
  var banner = document.getElementById('cookie-banner');
  if (banner) banner.style.display = 'none';
  if (accepted) {
    loadGoogleMaps();
  }
}

// Show banner or apply saved consent on load
(function initCookieConsent() {
  var consent = getCookieConsent();
  if (consent === 'accepted') {
    loadGoogleMaps();
  } else if (consent === null) {
    var banner = document.getElementById('cookie-banner');
    if (banner) banner.style.display = 'block';
  }

  var acceptBtn = document.getElementById('cookie-accept');
  var rejectBtn = document.getElementById('cookie-reject');
  var detailsToggle = document.getElementById('cookie-details-toggle');
  var mapConsentBtn = document.getElementById('map-consent-btn');

  if (acceptBtn) acceptBtn.addEventListener('click', function() { setCookieConsent(true); });
  if (rejectBtn) rejectBtn.addEventListener('click', function() { setCookieConsent(false); });

  if (detailsToggle) {
    detailsToggle.addEventListener('click', function(e) {
      e.preventDefault();
      var details = document.getElementById('cookie-details');
      if (details) details.style.display = details.style.display === 'none' ? 'block' : 'none';
    });
  }

  if (mapConsentBtn) {
    mapConsentBtn.addEventListener('click', function() {
      setCookieConsent(true);
    });
  }

  var resetBtn = document.getElementById('cookie-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.removeItem('cookieConsent');
      // Remove map iframe and restore placeholder
      var container = document.getElementById('map-container');
      if (container) {
        var iframe = container.querySelector('iframe');
        if (iframe) iframe.remove();
        if (!document.getElementById('map-placeholder')) {
          var placeholder = document.createElement('div');
          placeholder.id = 'map-placeholder';
          placeholder.className = 'map-placeholder';
          placeholder.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg><p>La mappa &egrave; disattivata. Accetta i cookie per visualizzarla.</p><button class="btn btn-primary btn-sm" id="map-consent-btn">Attiva Mappa</button>';
          container.appendChild(placeholder);
          placeholder.querySelector('#map-consent-btn').addEventListener('click', function() { setCookieConsent(true); });
        }
      }
      // Show banner again
      var banner = document.getElementById('cookie-banner');
      if (banner) banner.style.display = 'block';
    });
  }
})();

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const hamburger = document.getElementById('nav-hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const hamburgerIcon = document.getElementById('hamburger-icon');
const closeIcon = document.getElementById('close-icon');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('open');
  if (isOpen) {
    closeMobileMenu();
  } else {
    mobileMenu.classList.add('open');
    hamburgerIcon.style.display = 'none';
    closeIcon.style.display = 'block';
  }
});

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburgerIcon.style.display = 'block';
  closeIcon.style.display = 'none';
}

// Smooth scroll offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections and cards for animation
document.querySelectorAll('.section, .feature-card, .service-card, .gallery-item, .review-card, .orari-card').forEach(el => {
  el.classList.add('animate-on-scroll');
  observer.observe(el);
});

// Menu tab switching
document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    const tabs = btn.closest('.tabs');
    tabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    tabs.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + tab).classList.add('active');
  });
});

// Tab scroll fade gradients
const tabScroll = document.getElementById('tab-list-scroll');
const tabWrapper = tabScroll ? tabScroll.parentElement : null;

function updateFades() {
  if (!tabScroll || !tabWrapper) return;
  const atStart = tabScroll.scrollLeft <= 5;
  const atEnd = tabScroll.scrollLeft + tabScroll.clientWidth >= tabScroll.scrollWidth - 5;
  tabWrapper.classList.toggle('fade-left-visible', !atStart);
  tabWrapper.classList.toggle('fade-left-hidden', atStart);
  tabWrapper.classList.toggle('fade-right-hidden', atEnd);
  // Hide scroll hint once user starts scrolling
  var scrollHint = document.getElementById('scroll-hint');
  if (scrollHint && !atStart) scrollHint.classList.add('hidden');
}

if (tabScroll && tabWrapper) {
  updateFades();
  tabScroll.addEventListener('scroll', updateFades, { passive: true });
  window.addEventListener('resize', updateFades);
}

// ===== Language Translation System =====
const translations = {
  en: {
    // Navigation
    'nav.about': 'About Us',
    'nav.menu': 'Menu',
    'nav.hours': 'Hours',
    'nav.contact': 'Contact',
    'nav.call': 'Call',
    'nav.callNow': 'Call Now',

    // Hero
    'hero.location': 'Zanica (BG) \u2014 From the heart of Italian tradition',
    'hero.cta1': 'Discover More',
    'hero.cta2': 'Call Us',

    // About
    'about.eyebrow': 'About Us',
    'about.title': 'Tradition and Passion',
    'about.text': 'Bella Zanica is the gastronomic heart of Zanica. A place where tradition meets the art of pizza, creating a unique experience for families and friends. From our wood-fired oven come fragrant pizzas, stuffed calzoni, kebab and many other specialties prepared with passion and top-quality ingredients.',
    'about.feat1.title': 'Artisan Pizza',
    'about.feat1.desc': '48-hour risen dough, baked in a wood-fired oven with fresh, genuine ingredients.',
    'about.feat2.title': 'Kebab & Calzoni',
    'about.feat2.desc': 'Artisan kebab, stuffed calzoni and many specialties for all tastes.',
    'about.feat3.title': 'For Families & Friends',
    'about.feat3.desc': 'A welcoming atmosphere to share great food with loved ones.',

    // Menu section
    'menu.eyebrow': 'Our Menu',
    'menu.tab.classiche': 'Classic',
    'menu.tab.speciali': 'Special',
    'menu.tab.pizze': 'Pizzas',
    'menu.tab.famiglia': 'Family',
    'menu.tab.focacce': 'Focaccia',
    'menu.tab.panini': 'Sandwiches',
    'menu.tab.affettati': 'Cold Cuts',
    'menu.tab.tacos': 'Tacos',
    'menu.tab.calzoni': 'Calzoni',
    'menu.tab.combo': 'Combo',
    'menu.tab.fritture': 'Fried',
    'menu.tab.dessert': 'Dessert',
    'menu.tab.bibite': 'Drinks',
    'menu.scroll': 'Scroll',

    // Classiche descriptions
    'c.margherita': 'tomato, mozzarella',
    'c.marinara': 'double tomato, garlic, olive oil, oregano',
    'c.biancaneve': 'mozzarella, ricotta, Grana D.O.P.',
    'c.pugliese': 'tomato, mozzarella, red onions',
    'c.bufala': 'tomato, Campanian buffalo mozzarella D.O.P.',
    'c.prosciutto': 'tomato, mozzarella, cooked ham',
    'c.napoli': 'tomato, mozzarella, anchovies, oregano',
    'c.parmigiana': 'tomato, mozzarella, grilled eggplant, Grana D.O.P.',
    'c.gorgonzola': 'tomato, mozzarella, Gorgonzola D.O.P.',
    'c.marerosso': 'tomato, mozzarella, salmon, cream',
    'c.pota': 'tomato, mozzarella, cooked ham, french fries',
    'c.romana': 'tomato, mozzarella, anchovies, oregano, capers, black olive',
    'c.siciliana': 'tomato, mozzarella, anchovies, capers, oregano',
    'c.salamino': 'tomato, mozzarella, spicy salami',
    'c.speck': 'tomato, mozzarella, speck I.G.P.',
    'c.salsiccia': 'tomato, mozzarella, fresh sausage',
    'c.salamedolce': 'tomato, mozzarella, mild salami',
    'c.tonno': 'tomato, mozzarella, tuna',
    'c.wurstel': 'tomato, mozzarella, frankfurter',
    'c.bismarck': 'tomato, mozzarella, asparagus, egg, Grana D.O.P.',
    'c.crudo': 'tomato, mozzarella, 18-month Parma ham',
    'c.italiana': 'tomato, mozzarella, fresh cherry tomatoes, basil',
    'c.prosciuttofunghi': 'tomato, mozzarella, cooked ham, champignon mushrooms',
    'c.tonnocipolle': 'tomato, mozzarella, tuna, red onions',
    'c.americana': 'tomato, mozzarella, frankfurter, french fries',
    'c.capricciosa': 'tomato, mozzarella, cooked ham, champignon mushrooms, artichokes, olives',
    'c.caprese': 'tomato, buffalo mozzarella D.O.P., fresh cherry tomatoes, basil',
    'c.diavola': 'tomato, mozzarella, spicy salami, bell peppers, olives',
    'c.porcini': 'tomato, mozzarella, porcini mushrooms',
    'c.4formaggi': 'tomato, mozzarella, emmental, fontina, Gorgonzola D.O.P., Grana D.O.P.',
    'c.ricottaspinaci': 'tomato, mozzarella, ricotta, spinach, Grana D.O.P.',
    'c.verdure': 'tomato, mozzarella, zucchini, eggplant, bell peppers',
    'c.gamberetti': 'tomato, mozzarella, shrimp, arugula',
    'c.4stagioni': 'tomato, mozzarella, cooked ham, champignon mushrooms, artichokes, olives, oregano, anchovies',
    'c.fruttidimare': 'tomato, mozzarella, seafood, parsley, extra virgin olive oil, garlic',
    'c.maremonti': 'tomato, mozzarella, porcini mushrooms, seafood',

    // Speciali descriptions
    's.bing': 'tomato, mozzarella, french fries, ketchup',
    's.abate': 'tomato, mozzarella, fresh sausage, french fries',
    's.bergamasca': 'tomato, mozzarella, Gorgonzola D.O.P., pancetta',
    's.briespeck': 'tomato, mozzarella, speck I.G.P., brie',
    's.cimedirapa': 'tomato, mozzarella, broccoli rabe, fresh sausage',
    's.fantasia': 'tomato, mozzarella, brie, speck I.G.P., porcini mushrooms, Grana',
    's.liguria': 'mozzarella, pesto, burrata D.O.P., fresh cherry tomatoes',
    's.lucana': 'tomato, mozzarella, pancetta, porcini mushrooms, taleggio, Grana D.O.P.',
    's.amatriciana': 'tomato, mozzarella, pancetta, egg, cream',
    's.atalanta': 'tomato, mozzarella, artichokes, burrata D.O.P., 18-month Parma ham, Grana D.O.P.',
    's.cavallo': 'tomato, mozzarella, porcini mushrooms, bresaola I.G.P., arugula, Grana D.O.P.',
    's.delicata': 'tomato, mozzarella, 18-month Parma ham, buffalo mozzarella D.O.P., Grana, porcini mushrooms',

    // Pizze descriptions
    'p.marconi': 'tomato, mozzarella, ham, brie, porcini mushrooms',
    'p.paesana': 'tomato, mozzarella, fresh sausage, pancetta',
    'p.polenta': 'tomato, mozzarella, Bergamo-style polenta, fresh sausage, taleggio',
    'p.psw': 'tomato, mozzarella, ham, frankfurter, spicy salami',
    'p.spicy': 'tomato, mozzarella, spicy salami, Gorgonzola D.O.P., red onions',
    'p.stella': 'tomato, mozzarella, mild salami, red onions, bell peppers',
    'p.tirolese': 'tomato, mozzarella, fresh sausage, champignon mushrooms, red onions',
    'p.trevisana': 'tomato, mozzarella, radicchio, Gorgonzola D.O.P.',
    'p.zanica': 'tomato, mozzarella, cooked ham, mushrooms, spicy salami, artichokes, olives',
    'p.zolapere': 'mozzarella, Gorgonzola D.O.P., walnuts, pears or apples',
    'p.nilo': 'tomato, mozzarella, 18-month Parma ham, scamorza, arugula, Grana D.O.P.',
    'p.primavera': 'tomato, mozzarella, speck, Grana D.O.P., arugula, fresh cherry tomatoes',
    'p.4salumi': 'tomato, mozzarella, ham, rolled pancetta, frankfurter, spicy salami',
    'p.shawerma': 'tomato, mozzarella, kebab, bell peppers, spicy salami, hot sauce',
    'p.violetta': 'tomato, mozzarella, radicchio, spicy salami, Gorgonzola D.O.P., red onions',
    'p.masha': 'mozzarella, shrimp, zucchini, salmon, arugula',
    'p.mortadella': 'mozzarella, mortadella, burrata D.O.P., pistachio pesto, Grana',
    'p.pizzakebab': 'tomato, mozzarella, kebab, red onions, salad, french fries, hot sauce, yogurt sauce',
    'p.saporita': 'mozzarella, 18-month Parma ham, ricotta, spinach, Grana',
    'p.valtellina': 'tomato, mozzarella, bresaola I.G.P., arugula, Grana',

    // Focacce descriptions
    'foc.liscia': 'olive oil, salt, oregano',
    'foc.primavera': 'buffalo mozzarella D.O.P., fresh tomatoes, arugula, Grana (added after baking)',
    'foc.salumi': 'plain focaccia, choice of cured meat, arugula, Grana (added after baking)',

    // Panini descriptions
    'pan.hotdog': 'hot dog, ketchup, mayonnaise',
    'pan.falafel': 'pizza bread, falafel, salad, tomato, onions, pink sauce',
    'pan.kebab': 'pizza bread, chicken/turkey, salad, fries, tomato, onions, hot sauce, pink sauce, yogurt sauce',
    'pan.hamburger': 'cheese, tomato, salad, ketchup, mayonnaise',
    'pan.kebabbox': 'chicken/turkey, fries, sauce',
    'pan.piadfalafel': 'piadina flatbread, falafel, salad, tomato, onions, pink sauce',
    'pan.piadkebab': 'piadina flatbread, chicken/turkey, salad, fries, tomato, onions, hot sauce, pink sauce, yogurt sauce',
    'pan.kebabmaxi': 'pizza bread, chicken/turkey, salad, fries, tomato, onions, hot sauce, pink sauce, yogurt sauce',
    'pan.piattokebab': 'chicken/turkey, salad, fries, tomato, onions, hot sauce, pink sauce, yogurt sauce',
    'pan.piattoriso': 'chicken/turkey, salad, fries, sauce, rice',

    // Affettati descriptions
    'aff.bresaola': 'fresh cherry tomatoes, mozzarella, bresaola, arugula, Grana',
    'aff.cotto': 'cooked ham, mozzarella, mayonnaise',
    'aff.crudo': 'buffalo mozzarella, Parma ham, arugula, mayonnaise',

    // Tacos descriptions
    'tac.pollo': 'chicken, fries, Algerian sauce, mayonnaise, biggy',
    'tac.kebab': 'kebab, fries, Algerian sauce, mayonnaise, biggy',

    // Calzoni descriptions
    'cal.liscio': 'tomato, mozzarella, cooked ham',
    'cal.farcito': 'tomato, mozzarella, cooked ham, mushrooms, artichokes',
    'cal.amore': 'tomato, mozzarella, ricotta, spinach, cooked ham',
    'cal.gustoso': 'tomato, mozzarella, cooked ham, spicy salami, scamorza, porcini mushrooms',
    'cal.kebab': 'tomato, mozzarella, kebab, fries, onions, salad, pink sauce',
    'cal.coco': 'tomato, mozzarella, kebab, porcini mushrooms, scamorza, spicy salami',

    // Combo descriptions
    'com.falafel': 'falafel sandwich + french fries + drink',
    'com.hotdog': 'hot dog sandwich + french fries + drink',
    'com.piadfalafel': 'falafel piadina + french fries + drink',
    'com.kebab': 'kebab + french fries + drink',
    'com.hamburger': 'hamburger + french fries + drink',
    'com.piadina': 'kebab piadina + french fries + drink',
    'com.tacos': 'piadina tacos + french fries + drink',
    'menu.note': 'Each extra topping \u2014 +1.00\u20AC | Whole wheat / kamut / gluten-free dough \u2014 +1.00\u20AC',

    // Fritture names and descriptions
    'fri.patatine': 'French Fries',
    'fri.crocchette': 'Potato Croquettes',
    'fri.crocchette.d': '10 pieces',
    'fri.olive': 'Fried Stuffed Olives',
    'fri.olive.d': '10 pieces',
    'fri.mozzarelline': 'Fried Mozzarella Bites',
    'fri.mozzarelline.d': '10 pieces',
    'fri.speedy': 'Chicken Bites',
    'fri.speedy.d': '10 pieces',
    'fri.chele': 'Crab Claws',
    'fri.chele.d': '6 pieces',
    'fri.anelli': 'Onion Rings',
    'fri.anelli.d': '10 pieces',
    'fri.nuggets': 'Chicken Nuggets',
    'fri.nuggets.d': '10 pieces',
    'fri.rosticelle': 'Mexican Wings',
    'fri.rosticelle.d': '6 pieces',
    'fri.calamari': 'Fried Calamari',

    // Dessert
    'des.baklava.d': '4 pieces',

    // Bibite names
    'bib.acqua': 'Water 0.5L',
    'bib.lattina': 'Soft Drink Can 33cl',
    'bib.bottiglia': 'Soft Drink Bottle 1.5L',

    // Services
    'srv.eyebrow': 'What We Offer',
    'srv.title': 'Our Services',
    'srv.tavolo': 'Dine In',
    'srv.tavolo.d': 'Enjoy our dishes in a cozy, family-friendly atmosphere.',
    'srv.asporto': 'Takeaway',
    'srv.asporto.d': 'Order and pick up \u2014 your hot pizza ready in just minutes.',
    'srv.consegna': 'Delivery',
    'srv.consegna.d': 'Home delivery in the Zanica area and surroundings.',
    'srv.aperto': 'Outdoor Seating',
    'srv.aperto.d': 'Outdoor seating to enjoy your meal in good weather.',

    // Opening Hours
    'orari.eyebrow': 'When to Find Us',
    'orari.title': 'Opening Hours',
    'orari.weekly': 'Weekly Hours',
    'orari.lun': 'Monday',
    'orari.mar': 'Tuesday',
    'orari.mer': 'Wednesday',
    'orari.gio': 'Thursday',
    'orari.ven': 'Friday',
    'orari.sab': 'Saturday',
    'orari.dom': 'Sunday',

    // Contact
    'cont.eyebrow': 'Come Visit Us',
    'cont.title': 'Where We Are',
    'cont.address': 'Address',
    'cont.phone': 'Phone',
    'cont.cta': 'Call Us Now',

    // Reviews
    'rev.eyebrow': 'What Our Customers Say',
    'rev.title': 'Reviews',
    'rev.source': 'on Google',
    'rev.1': '\u201CDelicious pizza, light and well-cooked dough. The grilled chicken is spectacular! Fair prices and friendly staff.\u201D',
    'rev.2': '\u201CCozy and family-friendly place. The meat quality is excellent. Highly recommended for those seeking authentic tradition.\u201D',
    'rev.3': '\u201CExcellent kebab and well-topped pizzas. Fast service even on busy days. I\u2019ll definitely come back!\u201D',
    'rev.4': '\u201CThe calzoni are the best in the area! Generous portions and fresh ingredients. I recommend it to everyone.\u201D',
    'rev.1.date': '2 months ago',
    'rev.2.date': '1 month ago',
    'rev.3.date': '3 weeks ago',
    'rev.4.date': '1 week ago',

    // Cookie banner
    'cookie.text': 'This site uses third-party services (Google Maps) that may set cookies and collect data. You can accept or reject the use of these services.',
    'cookie.details': 'More details',
    'cookie.detailsText': 'We use Google Maps to show our location. This service may set cookies and transfer data to Google servers. Fonts are hosted locally and do not involve any third-party data transfer. No data is collected directly by us. Your preference is saved in your browser (localStorage).',
    'cookie.privacy': 'Privacy Policy',
    'cookie.accept': 'Accept All',
    'cookie.reject': 'Reject',
    'cookie.mapBlocked': 'The map is disabled. Accept cookies to view it.',
    'cookie.mapAccept': 'Enable Map',

    // Footer
    'footer.desc': 'Pizzeria with an Italian heart',
    'footer.contact': 'Contact',
    'footer.hours': 'Hours',
    'footer.days': 'Mon \u2013 Sun',
    'footer.privacy': 'Privacy Policy',
    'footer.cookieReset': 'Reset cookie preferences',
    'footer.rights': 'All rights reserved',
    'footer.madeBy': 'Website made by'
  }
};

// Store original Italian text on page load
document.querySelectorAll('[data-i18n]').forEach(el => {
  el.dataset.originalText = el.textContent;
});

function setLanguage(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem('lang', lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (lang === 'it') {
      if (el.dataset.originalText !== undefined) {
        el.textContent = el.dataset.originalText;
      }
    } else if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update toggle buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

// Language toggle click handlers
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    setLanguage(btn.dataset.lang);
  });
});

// Apply saved language preference on load
const savedLang = localStorage.getItem('lang');
if (savedLang && savedLang !== 'it') {
  setLanguage(savedLang);
}
