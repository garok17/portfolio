document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark Mode Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateToggleButton(currentTheme);
    }

    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleButton(newTheme);
    });

    function updateToggleButton(theme) {
        if (theme === 'dark') {
            themeToggleBtn.innerHTML = '☀️ Light Mode';
        } else {
            themeToggleBtn.innerHTML = '🌙 Dark Mode';
        }
    }

    // 2. Scroll Animation (Fade In)
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // 3. Interactive Certificates Viewer
    const certBtns = document.querySelectorAll('.cert-btn');
    const certFrame = document.getElementById('cert-frame');
    const certLinkOut = document.getElementById('cert-external-link');

    certBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            certBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            btn.classList.add('active');

            const fileLink = btn.getAttribute('data-link');
            
            // Google Drive blocks embedding standard '/view' links in iframes. 
            // We must convert it to '/preview' for the iframe to actually display it.
            let previewLink = fileLink;
            if(previewLink.includes('/view')) {
                previewLink = previewLink.replace('/view?usp=drive_link', '/preview').replace('/view', '/preview');
            }

            // Update iframe src
            certFrame.src = previewLink;
            // Update external link
            certLinkOut.href = fileLink;
        });
    });

    // Load the first certificate automatically on page load
    if (certBtns.length > 0) {
        certBtns[0].click();
    }
});
