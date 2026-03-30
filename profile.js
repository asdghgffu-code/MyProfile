// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 50,
    disable: false,
    startEvent: 'DOMContentLoaded',
    initClassName: 'aos-init',
    animatedClassName: 'aos-animate',
    useClassNames: false,
    disableMutationObserver: false,
    throttleDelay: 99,
    debounceDelay: 50
});

// Force AOS refresh after page load
window.addEventListener('load', function() {
    setTimeout(function() {
        AOS.refresh();
    }, 100);
});

// Reinitialize AOS on window resize
window.addEventListener('resize', function() {
    AOS.refresh();
});

// Initialize Particles.js
if (window.innerWidth > 768) {
    particlesJS('particles-bg', {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: '#2563eb' },
            shape: { type: 'circle' },
            opacity: { value: 0.4, random: false },
            size: { value: 2, random: true },
            line_linked: { enable: true, distance: 150, color: '#2563eb', opacity: 0.3, width: 1 },
            move: { enable: true, speed: 1.5, direction: 'none', random: false, straight: false, out_mode: 'out' }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' } }
        },
        retina_detect: true
    });
}

// Admin Authentication
let isAdmin = false;
const ADMIN_PASSWORD = "admin123";

const adminModal = document.getElementById('adminModal');
const adminLoginBtn = document.getElementById('adminLoginBtn');
const adminPassword = document.getElementById('adminPassword');
const adminError = document.getElementById('adminError');

window.openAdminModal = function() {
    if (adminModal) {
        adminModal.classList.add('open');
        adminPassword.value = '';
        adminError.textContent = '';
    }
};

function closeAdminModal() {
    if (adminModal) {
        adminModal.classList.remove('open');
    }
}

function adminLogin() {
    const password = adminPassword.value;
    if (password === ADMIN_PASSWORD) {
        isAdmin = true;
        localStorage.setItem('isAdmin', 'true');
        closeAdminModal();
        enableAdminMode();
        showNotification('Admin mode activated! You can now edit your profile photo.', 'success');
    } else {
        adminError.textContent = 'Invalid password. Please try again.';
        adminError.style.color = '#ef4444';
    }
}

function enableAdminMode() {
    const profileOverlay = document.getElementById('profileOverlay');
    const adminIndicator = document.getElementById('adminIndicator');
    
    if (profileOverlay) {
        profileOverlay.style.display = 'flex';
    }
    if (adminIndicator) {
        adminIndicator.style.display = 'flex';
    }
    
    document.body.classList.add('admin-mode');
}

function disableAdminMode() {
    const profileOverlay = document.getElementById('profileOverlay');
    const adminIndicator = document.getElementById('adminIndicator');
    
    if (profileOverlay) {
        profileOverlay.style.display = 'none';
    }
    if (adminIndicator) {
        adminIndicator.style.display = 'none';
    }
    
    document.body.classList.remove('admin-mode');
    localStorage.removeItem('isAdmin');
    isAdmin = false;
}

function checkAdminStatus() {
    const savedAdmin = localStorage.getItem('isAdmin');
    if (savedAdmin === 'true') {
        isAdmin = true;
        enableAdminMode();
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i><span>${message}</span>`;
    document.body.appendChild(notification);
    
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    `;
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Translation Data
const translations = {
    en: {
        logo: "MyPortfolio",
        navHome: "Home",
        navSkills: "Skills",
        navProjects: "Projects",
        navContact: "Contact",
        heroHello: "Hello, I'm",
        heroName: "AHMED MOHAMED",
        heroIam: "I am a",
        downloadText: "Download CV",
        changePhotoText: "Change Photo",
        skillsTitle: "My Skills",
        skillsFrontend: "Frontend Development",
        skillsTools: "Tools & Technologies",
        skillsSoft: "Soft Skills",
        skillsSecurity: "Security Domains",
        skillProblemSolving: "Problem Solving",
        skillTeamWork: "Team Work",
        skillCommunication: "Communication",
        skillAi: "AI in Security",
        skillSecurityDomains: "Security Domains",
        securityItems: ["Network Security", "Application Security", "Cloud Security", "Incident Response", "Security Auditing", "Risk Assessment"],
        projectsTitle: "My Projects",
        contactTitle: "Contact Me",
        contactEmail: "Email",
        contactPhone: "Phone",
        contactLocation: "Location",
        contactNameLabel: "Your Name",
        contactEmailLabel: "Your Email",
        contactMessageLabel: "Your Message",
        sendText: "Send Message",
        connectTitle: "Connect With Me",
        faqTitle: "Frequently Asked Questions",
        faq1: "What is your response time?",
        faq1Answer: "I typically respond within 24 hours.",
        faq2: "Are you available for freelance work?",
        faq2Answer: "Yes, I'm currently available for freelance projects.",
        faq3: "What is your preferred contact method?",
        faq3Answer: "Email is the best way to reach me for detailed inquiries.",
        footerText: "© 2024 Ahmed Mohamed. All rights reserved.",
        typingText: ["Web Developer", "Frontend Developer", "UI Enthusiast", "JavaScript Expert", "Security Professional"],
        projects: [
            { title: "Portfolio Website", desc: "A modern, responsive portfolio website showcasing my work and skills. Features include dark mode, RTL support, and interactive animations." },
            { title: "E-Commerce Platform", desc: "Full-featured e-commerce platform with cart, checkout, and payment integration. Built with modern technologies and best practices." },
            { title: "Weather App", desc: "Real-time weather application using OpenWeatherMap API with location detection. Displays temperature, humidity, and 5-day forecast." },
            { title: "Task Manager", desc: "Productivity app for managing tasks with drag-and-drop and local storage. Features priority levels, due dates, and categories." }
        ],
        modalBack: "Back to Projects",
        modalPrev: "Previous",
        modalNext: "Next",
        formSuccess: "✓ Message sent successfully!",
        formError: "✗ Failed to send. Please try again.",
        cvAlert: "Thank you for downloading my CV!"
    },
    ar: {
        logo: "معرض أعمالي",
        navHome: "الرئيسية",
        navSkills: "المهارات",
        navProjects: "المشاريع",
        navContact: "اتصل بي",
        heroHello: "مرحباً، أنا",
        heroName: "أحمد محمد",
        heroIam: "أنا",
        downloadText: "تحميل السيرة الذاتية",
        changePhotoText: "تغيير الصورة",
        skillsTitle: "مهاراتي",
        skillsFrontend: "تطوير الواجهات",
        skillsTools: "الأدوات والتقنيات",
        skillsSoft: "المهارات الشخصية",
        skillsSecurity: "مجالات الأمن السيبراني",
        skillProblemSolving: "حل المشكلات",
        skillTeamWork: "العمل الجماعي",
        skillCommunication: "التواصل",
        skillAi: "الذكاء الاصطناعي في الأمن",
        skillSecurityDomains: "مجالات الأمن السيبراني",
        securityItems: ["أمن الشبكات", "أمن التطبيقات", "أمن السحابة", "الاستجابة للحوادث", "تدقيق الأمن", "تقييم المخاطر"],
        projectsTitle: "مشاريعي",
        contactTitle: "اتصل بي",
        contactEmail: "البريد الإلكتروني",
        contactPhone: "الهاتف",
        contactLocation: "الموقع",
        contactNameLabel: "الاسم",
        contactEmailLabel: "البريد الإلكتروني",
        contactMessageLabel: "الرسالة",
        sendText: "إرسال الرسالة",
        connectTitle: "تواصل معي",
        faqTitle: "الأسئلة الشائعة",
        faq1: "ما هو وقت الرد؟",
        faq1Answer: "أرد عادةً خلال 24 ساعة.",
        faq2: "هل أنت متاح للعمل الحر؟",
        faq2Answer: "نعم، أنا متاح حالياً للمشاريع المستقلة.",
        faq3: "ما هي طريقة الاتصال المفضلة؟",
        faq3Answer: "البريد الإلكتروني هو أفضل طريقة للتواصل للاستفسارات المفصلة.",
        footerText: "© 2024 أحمد محمد. جميع الحقوق محفوظة",
        typingText: ["مطور ويب", "مطور واجهات أمامية", "مهتم بتجربة المستخدم", "خبير جافا سكريبت", "متخصص في الأمن السيبراني"],
        projects: [
            { title: "موقع المحفظة الشخصية", desc: "موقع محفظة حديث ومتجاوب يعرض أعمالي ومهاراتي. يتضمن الوضع المظلم ودعم RTL والرسوم المتحركة التفاعلية." },
            { title: "منصة التجارة الإلكترونية", desc: "منصة تجارة إلكترونية متكاملة مع سلة التسوق والدفع. تم بناؤها بأحدث التقنيات وأفضل الممارسات." },
            { title: "تطبيق الطقس", desc: "تطبيق طقس فوري باستخدام OpenWeatherMap API مع كشف الموقع. يعرض درجة الحرارة والرطوبة وتوقعات 5 أيام." },
            { title: "مدير المهام", desc: "تطبيق إنتاجية لإدارة المهام مع السحب والإفلات والتخزين المحلي. يتضمن مستويات الأولوية وتواريخ الاستحقاق والفئات." }
        ],
        modalBack: "العودة للمشاريع",
        modalPrev: "السابق",
        modalNext: "التالي",
        formSuccess: "✓ تم إرسال الرسالة بنجاح!",
        formError: "✗ فشل الإرسال. حاول مرة أخرى.",
        cvAlert: "شكراً لتحميل السيرة الذاتية!"
    }
};

// Global Variables
let currentLang = localStorage.getItem('language') || 'en';
let currentProjectIndex = 0;
let currentImageIndex = 0;
let typingTimeout;
let skillsSwiper = null;
let projectsSwiper = null;

// Typing Animation
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const text = translations[currentLang].typingText;
    const currentText = text[typingIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingTimeout = setTimeout(typeWriter, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typingIndex = (typingIndex + 1) % text.length;
        typingTimeout = setTimeout(typeWriter, 500);
        return;
    }
    
    typingTimeout = setTimeout(typeWriter, isDeleting ? 50 : 100);
}

// Photo Upload
function setupPhotoUpload() {
    const photoUpload = document.getElementById('photoUpload');
    const profileImage = document.getElementById('profileImage');
    
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
        profileImage.src = savedPhoto;
    }
    
    if (photoUpload) {
        photoUpload.addEventListener('change', function(e) {
            if (!isAdmin) {
                showNotification('Please login as admin to change photo', 'error');
                return;
            }
            
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const imageUrl = event.target.result;
                    profileImage.src = imageUrl;
                    localStorage.setItem('profilePhoto', imageUrl);
                    showNotification('Profile photo updated successfully!', 'success');
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// Copy to Clipboard
window.copyToClipboard = function(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    });
};

// Render Skills with Security Domains
function renderSkills() {
    const t = translations[currentLang];
    const skillsData = [
        { icon: "fas fa-code", title: t.skillsFrontend, tags: ["HTML5", "CSS3", "JavaScript", "React", "Vue.js"] },
        { icon: "fas fa-tools", title: t.skillsTools, tags: ["Git", "GitHub", "VS Code", "Figma", "npm"] },
        { icon: "fas fa-users", title: t.skillsSoft, tags: [t.skillProblemSolving, t.skillTeamWork, t.skillCommunication, t.skillAi] },
        { icon: "fas fa-shield-alt", title: t.skillsSecurity, tags: t.securityItems }
    ];
    
    // Desktop Grid
    const desktopGrid = document.getElementById('skillsGridDesktop');
    if (desktopGrid) {
        desktopGrid.innerHTML = '';
        skillsData.forEach((skill, index) => {
            const card = document.createElement('div');
            card.className = 'skill-card';
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', (index * 100).toString());
            card.innerHTML = `
                <div class="skill-icon"><i class="${skill.icon}"></i></div>
                <h3>${skill.title}</h3>
                <div class="skill-tags">${skill.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
            `;
            desktopGrid.appendChild(card);
        });
    }
    
    // Mobile Swiper
    const swiperWrapper = document.getElementById('skillsSwiperWrapper');
    if (swiperWrapper) {
        swiperWrapper.innerHTML = '';
        skillsData.forEach((skill) => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `
                <div class="skill-card">
                    <div class="skill-icon"><i class="${skill.icon}"></i></div>
                    <h3>${skill.title}</h3>
                    <div class="skill-tags">${skill.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
                </div>
            `;
            swiperWrapper.appendChild(slide);
        });
        
        // Reinitialize Swiper
        if (skillsSwiper) skillsSwiper.destroy(true, true);
        if (window.innerWidth <= 768) {
            skillsSwiper = new Swiper('#skillsCarousel', {
                slidesPerView: 1,
                spaceBetween: 20,
                pagination: { el: '.swiper-pagination', clickable: true },
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                breakpoints: { 480: { slidesPerView: 1 }, 640: { slidesPerView: 2 } }
            });
        }
    }
}

// Rest of the functions remain the same...
// (Keep all other functions like renderProjects, openProject, closeModal, etc. from previous version)

// For brevity, I'm including only the updated parts
// Make sure to keep all other functions from your previous script.js file

// Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

function toggleMenu() {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks && menuToggle) {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        if (!skillsSwiper && document.getElementById('skillsCarousel')) {
            skillsSwiper = new Swiper('#skillsCarousel', {
                slidesPerView: 1,
                spaceBetween: 20,
                pagination: { el: '.swiper-pagination', clickable: true },
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                breakpoints: { 480: { slidesPerView: 1 }, 640: { slidesPerView: 2 } }
            });
        }
        if (!projectsSwiper && document.getElementById('projectsCarousel')) {
            projectsSwiper = new Swiper('#projectsCarousel', {
                slidesPerView: 1,
                spaceBetween: 20,
                pagination: { el: '.swiper-pagination', clickable: true },
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                breakpoints: { 480: { slidesPerView: 1 }, 640: { slidesPerView: 2 } }
            });
        }
    } else {
        if (skillsSwiper) {
            skillsSwiper.destroy(true, true);
            skillsSwiper = null;
        }
        if (projectsSwiper) {
            projectsSwiper.destroy(true, true);
            projectsSwiper = null;
        }
    }
    
    AOS.refresh();
});

// Contact Forms
function setupContactForms() {
    const formDesktop = document.getElementById('contactForm');
    const formMobile = document.getElementById('contactFormMobile');
    const statusDesktop = document.getElementById('formStatus');
    const statusMobile = document.getElementById('formStatusMobile');
    
    const handleSubmit = (e, statusElement) => {
        e.preventDefault();
        const t = translations[currentLang];
        statusElement.textContent = currentLang === 'en' ? 'Sending...' : 'جاري الإرسال...';
        
        setTimeout(() => {
            statusElement.textContent = t.formSuccess;
            statusElement.style.color = 'green';
            setTimeout(() => statusElement.textContent = '', 3000);
            e.target.reset();
        }, 1000);
    };
    
    if (formDesktop) formDesktop.addEventListener('submit', (e) => handleSubmit(e, statusDesktop));
    if (formMobile) formMobile.addEventListener('submit', (e) => handleSubmit(e, statusMobile));
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 70;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        }
    });
});

// Modal Functions (keep from previous version)
function openProject(index) {
    currentProjectIndex = index;
    const t = translations[currentLang];
    const project = t.projects[index];
    
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDesc').textContent = project.desc;
    
    const slider = document.getElementById('modalSlider');
    slider.innerHTML = '';
    for (let i = 1; i <= 3; i++) {
        const img = document.createElement('img');
        img.src = `https://picsum.photos/600/400?random=${index}${i}`;
        img.alt = `${project.title} ${i}`;
        img.loading = "lazy";
        slider.appendChild(img);
    }
    
    currentImageIndex = 0;
    updateSlider();
    updateDots();
    
    document.getElementById('projectModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('projectModal').classList.remove('open');
    document.body.style.overflow = '';
}

function updateSlider() {
    const slider = document.getElementById('modalSlider');
    slider.style.transform = `translateX(-${currentImageIndex * 100}%)`;
}

function updateDots() {
    const dotsContainer = document.getElementById('galleryDots');
    dotsContainer.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('span');
        if (i === currentImageIndex) dot.classList.add('active');
        dot.onclick = () => {
            currentImageIndex = i;
            updateSlider();
            updateDots();
        };
        dotsContainer.appendChild(dot);
    }
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % 3;
    updateSlider();
    updateDots();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + 3) % 3;
    updateSlider();
    updateDots();
}

function nextProject() {
    const t = translations[currentLang];
    currentProjectIndex = (currentProjectIndex + 1) % t.projects.length;
    openProject(currentProjectIndex);
}

function prevProject() {
    const t = translations[currentLang];
    currentProjectIndex = (currentProjectIndex - 1 + t.projects.length) % t.projects.length;
    openProject(currentProjectIndex);
}

function renderProjects() {
    const t = translations[currentLang];
    
    const desktopGrid = document.getElementById('projectsGridDesktop');
    if (desktopGrid) {
        desktopGrid.innerHTML = '';
        t.projects.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', (index * 100).toString());
            card.innerHTML = `
                <div class="project-image"><i class="fas fa-laptop-code"></i></div>
                <div class="project-info">
                    <h3>${escapeHtml(project.title)}</h3>
                    <p>${escapeHtml(project.desc.substring(0, 100))}${project.desc.length > 100 ? '...' : ''}</p>
                    <button class="btn btn-primary" onclick="openProject(${index})">
                        <i class="fas fa-eye"></i> ${currentLang === 'en' ? 'View Details' : 'عرض التفاصيل'}
                    </button>
                </div>
            `;
            desktopGrid.appendChild(card);
        });
    }
    
    const swiperWrapper = document.getElementById('projectsSwiperWrapper');
    if (swiperWrapper && window.innerWidth <= 768) {
        swiperWrapper.innerHTML = '';
        t.projects.forEach((project, index) => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `
                <div class="project-card" onclick="openProject(${index})">
                    <div class="project-image"><i class="fas fa-laptop-code"></i></div>
                    <div class="project-info">
                        <h3>${escapeHtml(project.title)}</h3>
                        <p>${escapeHtml(project.desc.substring(0, 80))}${project.desc.length > 80 ? '...' : ''}</p>
                        <button class="btn btn-primary">
                            <i class="fas fa-eye"></i> ${currentLang === 'en' ? 'View Details' : 'عرض التفاصيل'}
                        </button>
                    </div>
                </div>
            `;
            swiperWrapper.appendChild(slide);
        });
        
        if (projectsSwiper) projectsSwiper.destroy(true, true);
        if (window.innerWidth <= 768) {
            projectsSwiper = new Swiper('#projectsCarousel', {
                slidesPerView: 1,
                spaceBetween: 20,
                pagination: { el: '.swiper-pagination', clickable: true },
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                breakpoints: { 480: { slidesPerView: 1 }, 640: { slidesPerView: 2 } }
            });
        }
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('#themeToggle i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

// Update Language
function updateLanguage() {
    const t = translations[currentLang];
    
    const elements = {
        logo: document.getElementById('logoText'),
        navHome: document.getElementById('navHome'),
        navSkills: document.getElementById('navSkills'),
        navProjects: document.getElementById('navProjects'),
        navContact: document.getElementById('navContact'),
        heroHello: document.getElementById('heroHello'),
        heroName: document.getElementById('heroName'),
        heroIam: document.getElementById('heroIam'),
        downloadText: document.getElementById('downloadText'),
        changePhotoText: document.getElementById('changePhotoText'),
        skillsTitle: document.getElementById('skillsTitle'),
        projectsTitle: document.getElementById('projectsTitle'),
        contactTitle: document.getElementById('contactTitle'),
        contactEmail: document.getElementById('contactEmail'),
        contactPhone: document.getElementById('contactPhone'),
        contactLocation: document.getElementById('contactLocation'),
        contactNameLabel: document.getElementById('contactNameLabel'),
        contactEmailLabel: document.getElementById('contactEmailLabel'),
        contactMessageLabel: document.getElementById('contactMessageLabel'),
        sendText: document.getElementById('sendText'),
        connectTitle: document.getElementById('connectTitle'),
        faqTitle: document.getElementById('faqTitle'),
        faq1: document.getElementById('faq1'),
        faq1Answer: document.getElementById('faq1Answer'),
        faq2: document.getElementById('faq2'),
        faq2Answer: document.getElementById('faq2Answer'),
        faq3: document.getElementById('faq3'),
        faq3Answer: document.getElementById('faq3Answer'),
        footerText: document.getElementById('footerText')
    };
    
    for (const [key, element] of Object.entries(elements)) {
        if (element && t[key]) {
            element.textContent = t[key];
        }
    }
    
    const mobileElements = {
        contactEmail: document.getElementById('contactEmailMobile'),
        contactPhone: document.getElementById('contactPhoneMobile'),
        contactLocation: document.getElementById('contactLocationMobile'),
        contactNameLabel: document.getElementById('contactNameLabelMobile'),
        contactEmailLabel: document.getElementById('contactEmailLabelMobile'),
        contactMessageLabel: document.getElementById('contactMessageLabelMobile'),
        sendText: document.getElementById('sendTextMobile')
    };
    
    for (const [key, element] of Object.entries(mobileElements)) {
        if (element && t[key.replace('Mobile', '')]) {
            element.textContent = t[key.replace('Mobile', '')];
        }
    }
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameInputMobile = document.getElementById('nameMobile');
    const emailInputMobile = document.getElementById('emailMobile');
    const messageInputMobile = document.getElementById('messageMobile');
    
    if (nameInput) nameInput.placeholder = t.contactNameLabel;
    if (emailInput) emailInput.placeholder = t.contactEmailLabel;
    if (messageInput) messageInput.placeholder = t.contactMessageLabel;
    if (nameInputMobile) nameInputMobile.placeholder = t.contactNameLabel;
    if (emailInputMobile) emailInputMobile.placeholder = t.contactEmailLabel;
    if (messageInputMobile) messageInputMobile.placeholder = t.contactMessageLabel;
    
    if (currentLang === 'ar') {
        document.body.classList.add('rtl');
        document.documentElement.lang = 'ar';
    } else {
        document.body.classList.remove('rtl');
        document.documentElement.lang = 'en';
    }
    
    document.querySelectorAll('.lang-toggle span').forEach(span => {
        span.classList.remove('active');
    });
    document.querySelector(`.lang-${currentLang}`).classList.add('active');
    
    renderSkills();
    renderProjects();
    
    if (typingTimeout) clearTimeout(typingTimeout);
    typingIndex = 0;
    charIndex = 0;
    isDeleting = false;
    setTimeout(typeWriter, 500);
}

// Modal Event Listeners
document.getElementById('modalBackBtn')?.addEventListener('click', closeModal);
document.getElementById('modalPrevBtn')?.addEventListener('click', prevProject);
document.getElementById('modalNextBtn')?.addEventListener('click', nextProject);
document.querySelector('.prev-img')?.addEventListener('click', prevImage);
document.querySelector('.next-img')?.addEventListener('click', nextImage);
document.querySelector('.close-modal')?.addEventListener('click', closeModal);

document.getElementById('projectModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'projectModal') closeModal();
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('projectModal');
    if (modal.classList.contains('open')) {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    }
});

// Download CV
document.getElementById('downloadCV')?.addEventListener('click', (e) => {
    e.preventDefault();
    showNotification(translations[currentLang].cvAlert, 'success');
});

// Theme and Language Toggle
document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
document.getElementById('langToggle')?.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    localStorage.setItem('language', currentLang);
    updateLanguage();
});

// Admin Event Listeners
if (adminLoginBtn) adminLoginBtn.addEventListener('click', adminLogin);
if (adminPassword) adminPassword.addEventListener('keypress', (e) => { if (e.key === 'Enter') adminLogin(); });
if (adminModal) adminModal.addEventListener('click', (e) => { if (e.target === adminModal) closeAdminModal(); });

// Initialize
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

setupPhotoUpload();
checkAdminStatus();
setupContactForms();
updateLanguage();

// Make functions global
window.openProject = openProject;
window.closeModal = closeModal;
window.nextProject = nextProject;
window.prevProject = prevProject;
window.nextImage = nextImage;
window.prevImage = prevImage;
window.copyToClipboard = copyToClipboard;
window.openAdminModal = openAdminModal;
window.disableAdminMode = disableAdminMode;

console.log('All animations enabled! Admin access: Type openAdminModal() in console to login');