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