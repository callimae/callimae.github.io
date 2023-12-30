document.getElementById('themeToggle').addEventListener('click', function() {
    var currentClass = document.body.className;
    if (document.body.id === 'home-page') {
        document.body.className = 'night-mode'
        return;  // Zakończ działanie skryptu na stronie głównej
    }
    if (currentClass === 'day-mode') {
        document.body.className = 'night-mode';
        localStorage.setItem('theme', 'night-mode');
    } else {
        document.body.className = 'day-mode';
        localStorage.setItem('theme', 'day-mode');
    }
});

// Ustaw domyślny motyw przy wczytaniu strony na podstawie local storage
document.addEventListener('DOMContentLoaded', function() {
    var savedTheme = localStorage.getItem('theme');
    if (document.body.id === 'home-page') {
        document.body.className = 'night-mode'
        return;  // Zakończ działanie skryptu na stronie głównej
    }
    if (savedTheme) {
        document.body.className = savedTheme;
    } else {
        document.body.className = 'night-mode'; // Domyślny tryb, jeśli nic nie jest zapisane
    }
});
