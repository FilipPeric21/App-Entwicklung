//sucht alle wichtigen Elemente anhand ihrer ID
const colorPicker = document.getElementById('baseColor');
const previewBox = document.getElementById('preview-box');
const previewText = document.getElementById('preview-text');
const btnPrimary = document.getElementById('preview-button-primary');
const btnAccent = document.getElementById('preview-button-accent');

// Die Text-Labels in denen die Hexcodes stehen werden
const labelSecondary = document.getElementById('label-secondary');
const labelAccent = document.getElementById('label-accent');
const labelBg = document.getElementById('label-bg');


colorPicker.addEventListener('input', () => {
    const primaryColor = colorPicker.value; // Die gewählte Farbe (z.B. #00ff00)

    // Berechnugen
    const secondaryColor = adjustBrightness(primaryColor, -20); 
    const accentColor = getComplementaryColor(primaryColor);    
    const backgroundColor = adjustBrightness(primaryColor, 90);  

    // UI aktualisieren (Farben auf der Seite anwenden)
    previewBox.style.backgroundColor = backgroundColor;
    
    btnPrimary.style.backgroundColor = primaryColor;
    btnPrimary.style.color = getContrastColor(primaryColor);

    btnAccent.style.backgroundColor = accentColor;
    btnAccent.style.color = getContrastColor(accentColor);

    previewText.style.color = primaryColor;

    // Die Hex-Codes in die Labels schreiben
    labelSecondary.textContent = secondaryColor;
    labelAccent.textContent = accentColor;
    labelBg.textContent = backgroundColor;
});

function getContrastColor(hexColor) {
    // Hex-Code in Rot, Grün und Blau (RGB) zerlegen
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);
    
    
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    // Schrift schwarz oder weiß je nach Helligkeit des Hintergrundes
    return brightness > 128 ? '#000000' : '#ffffff';
}

// Macht eine Farbe heller (positives %) oder dunkler (negatives %)
function adjustBrightness(hex, percent) {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    r = Math.round(Math.min(255, Math.max(0, r + (percent / 100) * 255)));
    g = Math.round(Math.min(255, Math.max(0, g + (percent / 100) * 255)));
    b = Math.round(Math.min(255, Math.max(0, b + (percent / 100) * 255)));

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Findet die Komplementärfarbe 
function getComplementaryColor(hex) {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    r = 255 - r;
    g = 255 - g;
    b = 255 - b;

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}