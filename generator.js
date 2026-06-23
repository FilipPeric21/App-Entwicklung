//sucht alle wichtigen Elemente anhand ihrer ID
const colorPicker = document.getElementById('baseColor');
const randomColorBtn = document.getElementById('random-color-btn');
const previewBox = document.getElementById('preview-box');
const previewText = document.getElementById('preview-text');
const btnPrimary = document.getElementById('preview-button-primary');
const btnAccent = document.getElementById('preview-button-accent');
const previewParagraph = document.getElementById('preview-paragraph');

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

    previewText.style.color = getContrastColor(backgroundColor);
    previewParagraph.style.color = getContrastColor(backgroundColor);

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

// Führt die Funktionen einmal beim Laden der Seite aus
window.onload = () => {
    colorPicker.dispatchEvent(new Event('input'));
};
// Kopier-Funktion
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert(`Kopiert: ${text}`);
    }).catch(err => {
        console.error('Fehler beim Kopieren:', err);
    });
}

// Klick-Events für Labels
labelSecondary.addEventListener('click', () => {
    copyToClipboard(labelSecondary.textContent);
});

labelAccent.addEventListener('click', () => {
    copyToClipboard(labelAccent.textContent);
});

labelBg.addEventListener('click', () => {
    copyToClipboard(labelBg.textContent);
});
// Zufällige Farbe generieren
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

// Klick auf Random-Button
randomColorBtn.addEventListener('click', () => {
    const randomColor = getRandomColor();

    // setzt neue Farbe
    colorPicker.value = randomColor;

    // löst dein bestehendes System aus
    colorPicker.dispatchEvent(new Event('input'));
});

// Button-Element suchen
const saveBtn = document.getElementById('save-palette-btn');

// Klick-Event hinzufügen
saveBtn.addEventListener('click', () => {
    // Die Daten sammeln, die gespeichert werden sollen
    const paletteData = {
        primary: colorPicker.value,
        secondary: labelSecondary.textContent,
        accent: labelAccent.textContent,
        background: labelBg.textContent,
        timestamp: new Date().toISOString()
    };

    // Daten an den JSON-Server senden
    fetch('http://localhost:3000/savedPalettes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paletteData)
    })
    .then(response => {
        if (response.ok) {
            alert('Palette erfolgreich in db.json gespeichert!');
        } else {
            alert('Fehler beim Speichern. Läuft der JSON-Server?');
        }
    })
    .catch(error => {
        console.error('Fehler:', error);
        alert('Server nicht erreichbar. Hast du "npx json-server --watch db.json" gestartet?');
    });
    
});   
document.querySelectorAll('.pd-copy-css').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();

    const card = btn.closest('.predesign-card');
    if (!card) return;

    const primary = card.dataset.primary;
    const secondary = card.dataset.secondary;
    const accent = card.dataset.accent;
    const bg = card.dataset.bg;

    const css = `:root {
  --color-primary: ${primary};
  --color-secondary: ${secondary};
  --color-accent: ${accent};
  --color-bg: ${bg};
}

body {
  background-color: var(--color-bg);
  color: #333;
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-accent {
  background-color: var(--color-accent);
  color: white;
}

h1, h2 {
  color: var(--color-primary);
}

a {
  color: var(--color-accent);
}`;

    copyToClipboard(css);
  });
});

document.querySelectorAll('.pd-copy-html').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();

    const card = btn.closest('.predesign-card');
    if (!card) return;

    const primary = card.dataset.primary;
    const secondary = card.dataset.secondary;
    const accent = card.dataset.accent;
    const bg = card.dataset.bg;

    const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Theme Beispiel</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background-color: ${bg};
      color: #333;
      font-family: Arial, sans-serif;
      padding: 40px 20px;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
    }

    h1 {
      color: ${primary};
      margin-bottom: 20px;
      font-size: 2.5rem;
    }

    p {
      color: ${secondary};
      margin-bottom: 20px;
      line-height: 1.6;
    }

    .button-group {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    button {
      padding: 12px 24px;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      cursor: pointer;
      font-weight: bold;
      transition: transform 0.2s;
    }

    .btn-primary {
      background-color: ${primary};
      color: white;
    }

    .btn-primary:hover {
      transform: scale(1.05);
    }

    .btn-accent {
      background-color: ${accent};
      color: white;
    }

    .btn-accent:hover {
      transform: scale(1.05);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Dein Theme</h1>
    <p>Dies ist ein Beispiel mit deinen ausgewählten Farben. Die Website passt sich an dein Farbschema an.</p>

    <div class="button-group">
      <button class="btn-primary">Primary Button</button>
      <button class="btn-accent">Accent Button</button>
    </div>
  </div>
</body>
</html>`;

    copyToClipboard(html);
  });
});

saveBtn.addEventListener('click', async () => {
    const primaryColor = colorPicker.value.toLowerCase();

    const paletteData = {
        primary: primaryColor,
        secondary: labelSecondary.textContent,
        accent: labelAccent.textContent,
        background: labelBg.textContent,
        timestamp: new Date().toISOString()
    };

    try {
        const paletteRes = await fetch('http://localhost:3000/savedPalettes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paletteData)
        });

        if (!paletteRes.ok) {
            alert('Fehler beim Speichern. Läuft der JSON-Server?');
            return;
        }

<<<<<<< HEAD
        const statsRes = await fetch(`http://localhost:3000/colorStats?primary=${encodeURIComponent(primaryColor)}`);
=======
        const statsRes = await fetch(http://localhost:3000/colorStats?primary=${encodeURIComponent(primaryColor)});
>>>>>>> 4ac0010e709bd4bdda92aee014dcfe0ed543983c
        const existing = await statsRes.json();

        if (existing.length > 0) {
            const entry = existing[0];
<<<<<<< HEAD
            await fetch(`http://localhost:3000/colorStats/${entry.id}`, {
=======
            await fetch(http://localhost:3000/colorStats/${entry.id}, {
>>>>>>> 4ac0010e709bd4bdda92aee014dcfe0ed543983c
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ count: entry.count + 1, lastUsed: new Date().toISOString() })
            });
        } else {
            await fetch('http://localhost:3000/colorStats', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    primary: primaryColor,
                    count: 1,
                    lastUsed: new Date().toISOString()
                })
            });
        }

        alert('Palette erfolgreich in db.json gespeichert!');

    } catch (error) {
        console.error('Fehler:', error);
        alert('Server nicht erreichbar. Hast du "npx json-server --watch db.json" gestartet?');
    }
});