// Dark Mode Toggle Funktionalität
document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle Button erstellen
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
    darkModeToggle.setAttribute('aria-label', 'Dark Mode umschalten');
    document.body.appendChild(darkModeToggle);

    // Gespeicherten Dark Mode Status laden
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
    }

    // Toggle Funktion
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Icon wechseln
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
            localStorage.setItem('darkMode', 'true');
        } else {
            darkModeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
            localStorage.setItem('darkMode', 'false');
        }
    });
});