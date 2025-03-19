// إجراءات عند تحميل المستند
document.addEventListener('DOMContentLoaded', function() {
  // تنشيط التمرير السلس
  enableSmoothScrolling();
  
  // إعداد قائمة الجوال
  setupMobileMenu();
  
  // إعداد مبدل اللغة
  setupLanguageSelector();
  
  // إعداد نموذج الاتصال
  setupContactForm();
  
  // الرسوم المتحركة عند التمرير
  setupScrollAnimations();
  
  // تحديث عام الحقوق الفكرية
  updateCopyrightYear();

  // إزالة فئة تحميل الصفحة بعد تحميل كامل المحتوى
  setTimeout(function() {
    document.body.classList.remove('page-loading');
  }, 500);

  // إعداد زر تبديل الوضع الداكن
  setupDarkModeToggle();

  // إعداد زر العودة للأعلى
  setupBackToTopButton();

  // إعداد مشغل النوافذ المنبثقة
  setupModalTriggers();

  // إعداد مرشحات المشاريع
  setupProjectFilters();

  // إعداد شريط التمرير الشهادات
  setupTestimonialsSlider();
});

// تمكين التمرير السلس للروابط
function enableSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
          }
      });
  });
}

// إعداد قائمة الهاتف المحمول
function setupMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn && navLinks) {
      mobileMenuBtn.addEventListener('click', function() {
          this.classList.toggle('active');
          navLinks.classList.toggle('active');
      });
      
      // إغلاق القائمة عند النقر على رابط
      navLinks.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', function() {
              navLinks.classList.remove('active');
              mobileMenuBtn.classList.remove('active');
          });
      });
  }
}

// إعداد مبدل اللغة
function setupLanguageSelector() {
  const languageSelect = document.getElementById('language-select');
  
  if (languageSelect) {
      languageSelect.addEventListener('change', function() {
          const lang = this.value;
          
          // تغيير اتجاه الصفحة واللغة
          document.documentElement.lang = lang;
          document.body.className = lang === 'ar' ? '' : 'ltr';
          document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
          
          // تحديث جميع النصوص مع السمات البيانية
          document.querySelectorAll('[data-' + lang + ']').forEach(el => {
              if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                  el.placeholder = el.getAttribute('data-' + lang);
              } else {
                  el.textContent = el.getAttribute('data-' + lang);
              }
          });
          
          // حفظ تفضيل اللغة في التخزين المحلي
          localStorage.setItem('preferred-language', lang);
      });
      
      // استرجاع اللغة المحفوظة عند تحميل الصفحة
      const savedLanguage = localStorage.getItem('preferred-language');
      if (savedLanguage) {
          languageSelect.value = savedLanguage;
          languageSelect.dispatchEvent(new Event('change'));
      }
  }
}

// إعداد نموذج الاتصال
function setupContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // الحصول على قيم النموذج
          const name = document.getElementById('name').value;
          const email = document.getElementById('email').value;
          const subject = document.getElementById('subject').value;
          const message = document.getElementById('message').value;
          
          // التحقق من صحة النموذج
          if (!validateForm(name, email, subject, message)) {
              return;
          }
          
          // هنا يمكنك إرسال البيانات إلى خادمك
          // مثال: sendFormData(name, email, subject, message);
          
          // إظهار رسالة النجاح (يمكن تعديلها حسب احتياجاتك)
          alert('تم إرسال الرسالة بنجاح. سنتواصل معك قريبًا.');
          
          // إعادة تعيين النموذج
          contactForm.reset();
      });
  }
}

// التحقق من صحة النموذج
function validateForm(name, email, subject, message) {
  // التحقق من أن جميع الحقول مملوءة
  if (!name || !email || !subject || !message) {
      alert('يرجى ملء جميع الحقول المطلوبة.');
      return false;
  }
  
  // التحقق من صحة البريد الإلكتروني
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      alert('يرجى إدخال بريد إلكتروني صحيح.');
      return false;
  }
  
  return true;
}

// إرسال بيانات النموذج (يجب تنفيذه حسب متطلباتك)
function sendFormData(name, email, subject, message) {
  // هذه الدالة يجب أن تنفذ حسب الخادم الخاص بك
  console.log('إرسال البيانات:', { name, email, subject, message });
  
  // مثال: يمكنك استخدام fetch API لإرسال البيانات
  /*
  fetch('https://your-server-endpoint.com/contact', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, subject, message })
  })
  .then(response => response.json())
  .then(data => {
      console.log('نجاح:', data);
  })
  .catch(error => {
      console.error('خطأ:', error);
  });
  */
}

// إعداد الرسوم المتحركة عند التمرير - تم تعديل هذه الوظيفة لإصلاح المشكلة
function setupScrollAnimations() {
  // إضافة صف الظهور للعناصر عند التمرير
  const animateOnScroll = function() {
      // تحديد جميع العناصر التي تحتاج للتحريك
      const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .fade-in');
      
      elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          // إذا كان العنصر مرئيًا في النافذة
          if (elementPosition.top < windowHeight * 0.9) {
              element.classList.add('animate');
          }
      });
  };
  
  // تنفيذ الرسوم المتحركة عند التمرير
  window.addEventListener('scroll', animateOnScroll);
  
  // تنفيذ الرسوم المتحركة عند تحميل الصفحة
  animateOnScroll();
}

// تحديث عام حقوق النشر تلقائيًا
function updateCopyrightYear() {
  const copyrightElement = document.getElementById('copyright');
  if (copyrightElement) {
      const currentYear = new Date().getFullYear();
      
      // تحديث العام في كل لغة
      ['ar', 'en', 'pt'].forEach(lang => {
          const text = copyrightElement.getAttribute('data-' + lang);
          if (text) {
              const updatedText = text.replace(/\d{4}/, currentYear);
              copyrightElement.setAttribute('data-' + lang, updatedText);
          }
      });
      
      // تحديث النص الحالي
      const currentLang = document.documentElement.lang;
      copyrightElement.textContent = copyrightElement.getAttribute('data-' + currentLang);
  }
}

// إعداد زر تبديل الوضع الداكن
function setupDarkModeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  
  if (themeToggle) {
      // تحقق من التفضيلات المحفوظة
      const isDarkMode = localStorage.getItem('dark-mode') === 'true';
      
      // تطبيق الوضع المحفوظ
      if (isDarkMode) {
          document.body.classList.add('dark-mode');
      }
      
      // إضافة مستمع الحدث لزر التبديل
      themeToggle.addEventListener('click', function() {
          document.body.classList.toggle('dark-mode');
          const isDarkModeNow = document.body.classList.contains('dark-mode');
          localStorage.setItem('dark-mode', isDarkModeNow);
      });
  }
}

// إعداد زر العودة للأعلى
function setupBackToTopButton() {
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
      // إظهار/إخفاء الزر عند التمرير
      window.addEventListener('scroll', function() {
          if (window.pageYOffset > 300) {
              backToTopBtn.classList.remove('hidden');
              backToTopBtn.classList.add('visible');
          } else {
              backToTopBtn.classList.remove('visible');
              setTimeout(() => {
                  if (!backToTopBtn.classList.contains('visible')) {
                      backToTopBtn.classList.add('hidden');
                  }
              }, 300);
          }
      });
      
      // العودة للأعلى عند النقر
      backToTopBtn.addEventListener('click', function() {
          window.scrollTo({
              top: 0,
              behavior: 'smooth'
          });
      });
  }
}

// إعداد مشغلات النوافذ المنبثقة
function setupModalTriggers() {
  const modalTriggers = document.querySelectorAll('.modal-trigger');
  const modals = document.querySelectorAll('.modal');
  const modalCloseButtons = document.querySelectorAll('.modal-close');
  
  // فتح النوافذ المنبثقة
  modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', function(e) {
          e.preventDefault();
          const modalId = this.getAttribute('href');
          const modal = document.querySelector(modalId);
          
          if (modal) {
              modal.classList.add('active');
              document.body.style.overflow = 'hidden';
          }
      });
  });
  
  // إغلاق النوافذ المنبثقة
  modalCloseButtons.forEach(closeButton => {
      closeButton.addEventListener('click', function() {
          const modal = this.closest('.modal');
          if (modal) {
              modal.classList.remove('active');
              document.body.style.overflow = '';
          }
      });
  });
  
  // إغلاق النوافذ المنبثقة عند النقر خارج المحتوى
  modals.forEach(modal => {
      modal.addEventListener('click', function(e) {
          if (e.target === this) {
              this.classList.remove('active');
              document.body.style.overflow = '';
          }
      });
  });
  
  // إغلاق النوافذ المنبثقة بالضغط على Esc
  document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
          modals.forEach(modal => {
              if (modal.classList.contains('active')) {
                  modal.classList.remove('active');
                  document.body.style.overflow = '';
              }
          });
      }
  });
}

// إعداد مرشحات المشاريع
function setupProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterButtons.length && projectCards.length) {
      // إضافة مستمعات الأحداث لأزرار الفلترة
      filterButtons.forEach(button => {
          button.addEventListener('click', function() {
              // إزالة الفئة النشطة من جميع الأزرار
              filterButtons.forEach(btn => btn.classList.remove('active'));
              
              // إضافة الفئة النشطة للزر المضغوط
              this.classList.add('active');
              
              // الحصول على فئة الفلترة
              const filterValue = this.getAttribute('data-filter');
              
              // فلترة المشاريع
              projectCards.forEach(card => {
                  card.classList.remove('show');
                  
                  if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                      setTimeout(() => {
                          card.classList.add('show');
                      }, 300);
                  }
              });
          });
      });
      
      // تنشيط فلتر "الجميع" افتراضيًا
      const allFilterButton = document.querySelector('.filter-btn[data-filter="all"]');
      if (allFilterButton) {
          allFilterButton.click();
      }
  }
}

// إعداد شريط التمرير للشهادات
function setupTestimonialsSlider() {
  const testimonialContainer = document.querySelector('.testimonials-container');
  const testimonialItems = document.querySelectorAll('.testimonial-item');
  const prevButton = document.querySelector('.testimonial-prev');
  const nextButton = document.querySelector('.testimonial-next');
  const dotsContainer = document.querySelector('.testimonials-dots');
  
  if (testimonialItems.length && testimonialContainer) {
      let currentIndex = 0;
      
      // إنشاء نقاط التنقل
      if (dotsContainer) {
          testimonialItems.forEach((_, index) => {
              const dot = document.createElement('div');
              dot.classList.add('testimonial-dot');
              if (index === 0) dot.classList.add('active');
              
              dot.addEventListener('click', function() {
                  goToSlide(index);
              });
              
              dotsContainer.appendChild(dot);
          });
      }
      
      // الانتقال للشريحة المحددة
      function goToSlide(index) {
          const dots = document.querySelectorAll('.testimonial-dot');
          
          currentIndex = index;
          
          // تحديث النقاط النشطة
          if (dots.length) {
              dots.forEach(dot => dot.classList.remove('active'));
              dots[currentIndex].classList.add('active');
          }
          
          // تحريك الشرائح
          testimonialContainer.style.transform = `translateX(${-100 * currentIndex}%)`;
      }
      
      // إضافة مستمعات للأزرار
      if (prevButton) {
          prevButton.addEventListener('click', function() {
              currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
              goToSlide(currentIndex);
          });
      }
      
      if (nextButton) {
          nextButton.addEventListener('click', function() {
              currentIndex = (currentIndex + 1) % testimonialItems.length;
              goToSlide(currentIndex);
          });
      }
      
      // تهيئة الشرائح
      testimonialContainer.style.width = `${testimonialItems.length * 100}%`;
      testimonialItems.forEach(item => {
          item.style.width = `${100 / testimonialItems.length}%`;
      });
  }
}

// تحديث الهيدر عند التمرير
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  
  if (header) {
      // إضافة فئة عند التمرير لأسفل
      if (window.scrollY > 100) {
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
      
      // إخفاء/إظهار الهيدر عند التمرير
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 300) {
          if (currentScrollY > window.lastScrollY) {
              header.classList.add('hidden');
          } else {
              header.classList.remove('hidden');
          }
      }
      
      window.lastScrollY = currentScrollY;
  }
});

// عداد الأرقام للإحصائيات
function animateNumbers() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(number => {
      const targetNumber = parseInt(number.getAttribute('data-count'));
      const duration = 2000; // بالمللي ثانية
      const framesPerSecond = 60;
      const totalFrames = duration / 1000 * framesPerSecond;
      const increment = targetNumber / totalFrames;
      
      let currentNumber = 0;
      let frame = 0;
      
      const counter = setInterval(() => {
          frame++;
          currentNumber += increment;
          
          number.textContent = Math.min(Math.floor(currentNumber), targetNumber);
          
          if (frame >= totalFrames) {
              number.textContent = targetNumber;
              clearInterval(counter);
          }
      }, 1000 / framesPerSecond);
  });
}

// تشغيل عداد الأرقام عند الوصول لقسم الإحصائيات
const statsSection = document.getElementById('about');
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              animateNumbers();
              observer.unobserve(entry.target);
          }
      });
  }, { threshold: 0.5 });
  
  observer.observe(statsSection);
}