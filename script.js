// Theme switching functionality
const themeButtons = document.querySelectorAll('.theme-btn');
const body = document.body;

themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme');

        // Update body theme
        body.setAttribute('data-theme', theme);

        // Update active button
        themeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Store theme preference
        localStorage.setItem('theme', theme);
    });
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
themeButtons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-theme') === savedTheme);
});

// Smooth scrolling and section visibility
let currentSection = 0;
const sections = document.querySelectorAll('.section');
const navDots = document.querySelectorAll('.nav-dot');

// Initialize
window.addEventListener('load', () => {
    animateSkillBars();
});

// Scroll handling
let isScrolling = false;
window.addEventListener('wheel', (e) => {
    if (isScrolling) return;

    isScrolling = true;
    setTimeout(() => isScrolling = false, 1000);

    if (e.deltaY > 0 && currentSection < sections.length - 1) {
        currentSection++;
        scrollToSection(currentSection);
    } else if (e.deltaY < 0 && currentSection > 0) {
        currentSection--;
        scrollToSection(currentSection);
    }
});

// Navigation dots
navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSection = index;
        scrollToSection(index);
    });
});

function scrollToSection(index) {
    currentSection = index;

    // Update active dot
    navDots.forEach(dot => dot.classList.remove('active'));
    navDots[index].classList.add('active');

    // Scroll to section
    sections[index].scrollIntoView({ behavior: 'smooth' });

    // Show section
    setTimeout(() => {
        sections[index].classList.add('visible');

        // Animate skill bars when skills section is visible
        if (index === 3) {
            animateSkillBars();
        }
    }, 300);
}

//download resume
function downloadResume() {
  const link = document.createElement('a');
  link.href = 'assets/JOSEPHRESUME.pdf';
  link.download = 'JOSEPHRESUME.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

// Intersection Observer for section visibility
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Update current section and nav dots
            const sectionIndex = Array.from(sections).indexOf(entry.target);
            if (sectionIndex !== -1) {
                currentSection = sectionIndex;
                navDots.forEach(dot => dot.classList.remove('active'));
                navDots[sectionIndex].classList.add('active');
            }
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => {
    observer.observe(section);
});
// Add parallax effect to hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-bg');
    if (heroBackground) {
        heroBackground.style.transform = `translate(-50%, -50%) translateY(${scrolled * 0.5}px)`;
    }
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();

}




