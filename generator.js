// Elemente aus dem HTML holen
const colorPicker = document.getElementById('baseColor');
const previewBox = document.getElementById('preview-box');
const previewText = document.getElementById('preview-text');
const btnPrimary = document.getElementById('preview-button-primary');
const btnAccent = document.getElementById('preview-button-accent');

const labelSecondary = document.getElementById('label-secondary');
const labelAccent = document.getElementById('label-accent');
const labelBg = document.getElementById('label-bg');

// Event-Listener: Wird jedes Mal ausgeführt, wenn die Farbe geändert wird
colorPicker.addEventListener('input', () => {
    const primaryColor = colorPicker.value;

    // 1. Farben berechnen
    const secondaryColor = adjustBrightness(primaryColor, -20); // 20% dunkler
    const accentColor = getComplementaryColor(primaryColor);    // Kontrastfarbe
    const backgroundColor = adjustBrightness(primaryColor, 90);  // 90% heller (Pastell)

    // 2. UI-Vorschau aktualisieren
    // Hintergrund der Box
    previewBox.style.backgroundColor = backgroundColor;
    
    // Haupt-Button
    btnPrimary.style.backgroundColor = primaryColor;
    btnPrimary.style.color = getContrastColor(primaryColor);
    btnPrimary.innerText = "Primary Color";

    // Akzent-Button
    btnAccent.style.backgroundColor = accentColor;
    btnAccent.style.color = getContrastColor(accentColor);
    btnAccent.innerText = "Accent Color";

    // Textfarbe in der Box (entweder Primary oder Schwarz für Kontrast)
    previewText.style.color = primaryColor;

    // 3. Hex-Labels beschriften
    labelSecondary.textContent = secondaryColor;
    labelAccent.textContent = accentColor;
    labelBg.textContent = backgroundColor;
});

// --- HILFSFUNKTIONEN ---

// Funktion: Berechnet Kontrastfarbe (Schwarz oder Weiß)
function getContrastColor(hexColor) {
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);
    
    // Luminanz-Formel
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
}

// Funktion: Macht Farben heller oder dunkler
function adjustBrightness(hex, percent) {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    r = Math.round(Math.min(255, Math.max(0, r + (percent / 100) * 255)));
    g = Math.round(Math.min(255, Math.max(0, g + (percent / 100) * 255)));
    b = Math.round(Math.min(255, Math.max(0, b + (percent / 100) * 255)));

    const hr = r.toString(16).padStart(2, '0');
    const hg = g.toString(16).padStart(2, '0');
    const hb = b.toString(16).padStart(2, '0');

    return `#${hr}${hg}${hb}`;
}

// Funktion: Berechnet die Komplementärfarbe (Gegenteil auf dem Farbkreis)
function getComplementaryColor(hex) {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    r = 255 - r;
    g = 255 - g;
    b = 255 - b;

    const hr = r.toString(16).padStart(2, '0');
    const hg = g.toString(16).padStart(2, '0');
    const hb = b.toString(16).padStart(2, '0');

    return `#${hr}${hg}${hb}`;
}

// Initialer Aufruf beim Laden der Seite
window.onload = () => colorPicker.dispatchEvent(new Event('input'));    