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
    
    // Luminanz-Berechnung (Helligkeit für das menschliche Auge)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    // Wenn hell, dann schwarze Schrift, wenn dunkel, dann weiße Schrift
    return brightness > 128 ? '#000000' : '#ffffff';
}