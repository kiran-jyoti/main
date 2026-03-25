function changeLanguage() {
    var selectedLanguage = document.getElementById("languageSelect").value;
    // Store the selected language in local storage
    localStorage.setItem("languageSelect", selectedLanguage);
    fetchLanguageContent(selectedLanguage);
}

function fetchLanguageContent(language) {
    fetch(`./translations/${language}.json`)
    .then(response => response.json())
    .then(data => {
        document.getElementById("heroName").textContent = data.heroName;
        document.getElementById("heroTitle").textContent = data.heroTitle;
        document.getElementById("heroEducation").textContent = data.heroEducation;
        document.getElementById("heroTagline").textContent = data.heroTagline;
        document.getElementById("journeyTitle").textContent = data.journeyTitle;
        document.getElementById("impactTitle").textContent = data.impactTitle;
        document.getElementById("educationTitle").textContent = data.educationTitle;
        document.getElementById("skillsTitle").textContent = data.skillsTitle;
        document.getElementById("learningTitle").textContent = data.learningTitle;
        document.getElementById("goalsTitle").textContent = data.goalsTitle;

        // Journey timeline
        const journeyHTML = data.journey.map(item => `
            <div class="timeline-item">
                <div class="timeline-date">${item.date}</div>
                <div class="timeline-title">${item.title}</div>
                <div class="timeline-desc">${item.desc}</div>
            </div>
        `).join('');
        document.getElementById("journeyContent").innerHTML = journeyHTML;

        // Key Impact
        const impactHTML = data.impact.map(achievement => 
            `<li class="achievement-item">${achievement}</li>`
        ).join('');
        document.getElementById("impactContent").innerHTML = impactHTML;

        // Education
        const educationHTML = data.education.map(edu => `
            <div style="margin-bottom: 1.25rem;">
                <div style="font-weight: 600; color: var(--text-primary);">${edu.school}</div>
                <div style="color: var(--text-secondary); font-size: 0.95rem;">${edu.degree}</div>
                <div style="color: var(--accent); font-size: 0.875rem; font-weight: 500;">${edu.status}</div>
            </div>
        `).join('');
        document.getElementById("educationContent").innerHTML = educationHTML;

        // Skills
        const skillsHTML = `
            <div class="skill-section">
        <div class="skill-section-title">${language === 'en' ? 'Advanced' : 'Avanzado'}</div>
        <div class="skill-tags">
            ${data.skills.advanced.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
    </div>
    <div class="skill-section">
        <div class="skill-section-title">${language === 'en' ? 'Proficient' : 'Competente'}</div>
        <div class="skill-tags">
            ${data.skills.proficient.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
    </div>
    <div class="skill-section">
        <div class="skill-section-title">${language === 'en' ? 'Currently Learning' : 'Aprendiendo Actualmente'}</div>
        <div class="skill-tags">
            ${data.skills.learning.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
    </div>
`;
        document.getElementById("skillsContent").innerHTML = skillsHTML;

        // Learning
        document.getElementById("learningContent").innerHTML = `<p style="color: var(--text-secondary);">${data.learning}</p>`;

        // Goals
        document.getElementById("goalsIntro").innerHTML = `<p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${data.goalsIntro}</p>`;
        const goalsHTML = data.goals.map(goal => `<li class="achievement-item">${goal}</li>`).join('');
        document.getElementById("goalsList").innerHTML = goalsHTML;
    })
    .catch(error => console.error('Error fetching translations:', error));

}

function changeTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    // Store the selected theme in local storage
    localStorage.setItem("selectedTheme", theme);
}

/* Side navigation toggle for mobile */
function toggleNav() {
    // reuse unified toggle so desktop and mobile behave the same
    toggleSideNavVisibility();
}

function closeNav() {
    const nav = document.getElementById('sideNav');
    if (!nav) return;
    nav.classList.remove('open');
    document.body.classList.remove('nav-open');
}

/* Unified toggle for side navigation (desktop + mobile) */
function toggleSideNavVisibility() {
    const nav = document.getElementById('sideNav');
    if (!nav) return;
    const isOpen = nav.classList.toggle('open');
    // when open on wide screens, add body padding via .nav-open
    document.body.classList.toggle('nav-open', isOpen);
}

// Smooth scroll behavior for anchor links
document.addEventListener('click', function (e) {
    const target = e.target;
    if (target.tagName === 'A' && target.getAttribute('href') && target.getAttribute('href').startsWith('#')) {
        const id = target.getAttribute('href').slice(1);
        const el = document.getElementById(id);
        if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            closeNav();
        }
    }
});

function loadInitialLanguage() {
    var storedLanguage = localStorage.getItem("languageSelect") || "en";
    document.getElementById("languageSelect").value = storedLanguage;
    fetchLanguageContent(storedLanguage);
}

function loadInitialTheme() {
    var storedTheme = localStorage.getItem("selectedTheme") || "dark"; 
    changeTheme(storedTheme);
}

document.addEventListener("DOMContentLoaded", function () {
    loadInitialTheme();
    loadInitialLanguage();
});