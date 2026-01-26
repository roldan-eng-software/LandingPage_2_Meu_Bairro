/**
 * MeuBairro Landing Page - Main JavaScript
 * Versão: 1.0
 * Autor: MeuBairro Team
 */

// ============================================
// CONFIGURAÇÕES EmailJS
// ============================================
// IMPORTANTE: Substitua pelos seus dados do EmailJS
const EMAILJS_CONFIG = {
  publicKey: 'RR9BbO6bfvuFkgz3p', // Substitua pelo seu Public Key
  serviceId: 'service_ozhjk4g', // Substitua pelo seu Service ID
  templateIdUser: 'template_kop5bjg', // Template para o usuário
};

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSmoothScroll();
  initMobileMenu();
  initLoginModal();
  initLeadForm();
  initWhatsAppButton();
  initScrollAnimations();
});

// ============================================
// NAVBAR
// ============================================
function initNavbar() {
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        // Fecha o menu mobile se estiver aberto
        closeMobileMenu();

        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
  }

  // Fecha menu ao clicar em um link
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

function closeMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ============================================
// LOGIN MODAL
// ============================================
function initLoginModal() {
  const loginBtn = document.querySelectorAll('.btn-login');
  const modal = document.getElementById('loginModal');
  const closeBtn = document.querySelector('.btn-close-modal');
  const waitlistBtn = document.querySelector('.btn-waitlist');

  loginBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (waitlistBtn) {
    waitlistBtn.addEventListener('click', () => {
      closeModal();
      const leadSection = document.getElementById('lead-capture');
      if (leadSection) {
        leadSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // Fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // Fechar ao clicar fora
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
}

function openModal() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ============================================
// LEAD FORM COM EMAILJS
// ============================================
function initLeadForm() {
  const form = document.getElementById('leadForm');
  const successMessage = document.getElementById('formSuccess');

  if (!form) return;

  // Validação em tempo real
  const emailInput = form.querySelector('input[type="email"]');
  if (emailInput) {
    emailInput.addEventListener('blur', () => validateEmail(emailInput));
    emailInput.addEventListener('input', () => {
      if (emailInput.classList.contains('error')) {
        validateEmail(emailInput);
      }
    });
  }

  // Validação em tempo real para WhatsApp
  const whatsappInput = form.querySelector('#whatsapp');
  if (whatsappInput) {
    whatsappInput.addEventListener('blur', () => validateWhatsApp(whatsappInput));
    whatsappInput.addEventListener('input', () => {
      if (whatsappInput.classList.contains('error')) {
        validateWhatsApp(whatsappInput);
      }
    });
  }

  // Submit do formulário
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validações
    if (!validateForm(form)) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Loading state
    submitBtn.classList.add('btn-loading');
    submitBtn.innerHTML = 'Enviando...';
    submitBtn.disabled = true;

    try {
      // Dados do formulário
      const formData = {
        nome: form.querySelector('#nome').value.trim(),
        email: form.querySelector('#email').value.trim(),
        whatsapp: form.querySelector('#whatsapp').value.trim(),
        servico: form.querySelector('#servico').value
      };

      // Verifica se EmailJS está configurado
      if (EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY' && typeof emailjs !== 'undefined') {
        // Envia email para o usuário
        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateIdUser,
          formData
        );

        // Envia notificação para o admin
        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateIdAdmin,
          {
            ...formData,
            title: `Novo Lead Capturado - ${formData.nome}`
          }
        );
      } else {
        // Simula envio para desenvolvimento
        console.log('EmailJS não configurado. Dados do formulário:', formData);
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      // Sucesso
      form.style.display = 'none';
      successMessage.style.display = 'block';

      // Reset form
      form.reset();

    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      showFormError('Houve um erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp.');
    } finally {
      submitBtn.classList.remove('btn-loading');
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

function validateForm(form) {
  let isValid = true;

  // Valida nome
  const nomeInput = form.querySelector('#nome');
  if (!nomeInput.value.trim()) {
    showInputError(nomeInput, 'Por favor, insira seu nome');
    isValid = false;
  } else {
    clearInputError(nomeInput);
  }

  // Valida email
  const emailInput = form.querySelector('#email');
  if (!validateEmail(emailInput)) {
    isValid = false;
  }

  // Valida WhatsApp
  const whatsappInput = form.querySelector('#whatsapp');
  if (!validateWhatsApp(whatsappInput)) {
    isValid = false;
  }

  // Valida serviço
  const servicoSelect = form.querySelector('#servico');
  if (!servicoSelect.value) {
    showInputError(servicoSelect, 'Por favor, selecione um tipo de serviço');
    isValid = false;
  } else {
    clearInputError(servicoSelect);
  }

  return isValid;
}

function validateEmail(input) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const value = input.value.trim();

  if (!value) {
    showInputError(input, 'Por favor, insira seu email');
    return false;
  } else if (!emailRegex.test(value)) {
    showInputError(input, 'Por favor, insira um email válido');
    return false;
  } else {
    clearInputError(input);
    return true;
  }
}

function validateWhatsApp(input) {
  const value = input.value.trim();
  // Remove todos os caracteres não numéricos
  const numbersOnly = value.replace(/\D/g, '');

  if (!value) {
    showInputError(input, 'Por favor, insira seu WhatsApp');
    return false;
  } else if (numbersOnly.length < 10 || numbersOnly.length > 11) {
    showInputError(input, 'Por favor, insira um número válido (DDD + número)');
    return false;
  } else {
    clearInputError(input);
    return true;
  }
}

function showInputError(input, message) {
  input.classList.add('error');

  let errorEl = input.parentElement.querySelector('.error-message');
  if (!errorEl) {
    errorEl = document.createElement('div');
    errorEl.className = 'error-message';
    input.parentElement.appendChild(errorEl);
  }
  errorEl.textContent = message;
}

function clearInputError(input) {
  input.classList.remove('error');
  const errorEl = input.parentElement.querySelector('.error-message');
  if (errorEl) {
    errorEl.remove();
  }
}

function showFormError(message) {
  const form = document.getElementById('leadForm');
  let errorEl = form.querySelector('.form-error-global');

  if (!errorEl) {
    errorEl = document.createElement('div');
    errorEl.className = 'form-error-global';
    errorEl.style.cssText = 'background: #FEE2E2; color: #DC2626; padding: 12px; border-radius: 8px; margin-bottom: 16px; text-align: center;';
    form.insertBefore(errorEl, form.firstChild);
  }

  errorEl.textContent = message;

  setTimeout(() => {
    errorEl.remove();
  }, 5000);
}

// ============================================
// WHATSAPP BUTTON
// ============================================
function initWhatsAppButton() {
  const whatsappBtn = document.querySelector('.whatsapp-float');

  if (whatsappBtn) {
    // Animação de entrada
    setTimeout(() => {
      whatsappBtn.style.opacity = '1';
      whatsappBtn.style.transform = 'scale(1)';
    }, 1000);
  }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Adiciona animação aos elementos
  document.querySelectorAll('.problem-card, .solution-card, .step-card, .pricing-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Adiciona classe para animação
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
});

// ============================================
// UTILITÁRIOS
// ============================================

// Formata número de telefone
function formatPhone(phone) {
  return phone.replace(/\D/g, '');
}

// Gera link do WhatsApp
function getWhatsAppLink(phone, message = '') {
  const formattedPhone = formatPhone(phone);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
}

// Debounce para otimização
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ============================================
// TRACKING (Google Analytics)
// ============================================
function trackEvent(category, action, label = '') {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: category,
      event_label: label
    });
  }
}

// Track CTA clicks
document.addEventListener('click', (e) => {
  const target = e.target.closest('a, button');

  if (!target) return;

  // Track pricing CTA
  if (target.classList.contains('btn-primary') && target.closest('.pricing-card')) {
    const planName = target.closest('.pricing-card').querySelector('h3').textContent;
    trackEvent('Pricing', 'click_cta', planName);
  }

  // Track WhatsApp clicks
  if (target.classList.contains('whatsapp-float') || target.href?.includes('wa.me')) {
    trackEvent('WhatsApp', 'click', window.location.pathname);
  }

  // Track lead form
  if (target.type === 'submit' && target.closest('#leadForm')) {
    trackEvent('Lead', 'form_submit', 'newsletter');
  }
});

// ============================================
// INICIALIZAÇÃO EmailJS
// ============================================
// Inicializa EmailJS quando o script carregar
if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
  emailjs.init(EMAILJS_CONFIG.publicKey);
}
