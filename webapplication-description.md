## 1. Project Title

**App-Icon-Generator**
	Alexander K. Jäger, Filip Peric

---

## 2. Project Idea

Der App-Icon-Generator ist ein nützliches Web-Tool für App-Entwickler, das den mühsamen Prozess der Icon-Erstellung automatisiert.

Anstatt dutzende Bilder manuell in verschiedenen Größen zu exportieren, laden Nutzer ein einzelnes, hochauflösendes Bild (1024x1024 px) hoch. Die Web-App verarbeitet dieses Bild im Browser und generiert automatisch alle erforderlichen Icon-Größen für iOS und Android – inklusive der korrekten Ordnerstruktur und Metadaten-Dateien (wie die Contents.json für Xcode). Das Ergebnis wird als fertige ZIP-Datei zum Download bereitgestellt.

## 3. Target Audience

Die Web-App richtet sich primär an App-Entwickler (Einsteiger bis Profis) und UI/UX-Designer.

Sie hilft jedem, der eine App für den App Store oder Google Play Store veröffentlicht und Zeit bei der Vorbereitung der grafischen Assets sparen möchte. Auch für Schüler und Studenten im Bereich Informatik ist es ein hilfreiches Werkzeug, um Projekte schneller zu professionalisieren.
---

## 4. Structure of the Website

Upload-Bereich: Ein prominentes „Drag & Drop“-Feld für das Ausgangsbild (PNG/JPG).

Live-Vorschau: Eine interaktive Sektion, die zeigt, wie das Icon auf einem iPhone- oder Android-Home-Screen (mit abgerundeten Ecken) aussehen würde.

Optionen/Konfiguration: Auswahlmöglichkeit, ob Icons für iOS, Android oder beide Systeme generiert werden sollen.

Download-Sektion: Ein Fortschrittsbalken während der Generierung und ein finaler Button zum Herunterladen der ZIP-Datei. 
---

## 5. Design and Layout

Das Design ist minimalistisch, funktional und modern (Utility-Look).

Layout: Ein einseitiges Dashboard (Single Page Application), um unnötige Ladezeiten zu vermeiden.

Fokus: Der Fokus liegt auf dem zentralen Upload-Bereich. Kontrastreiche Buttons (z. B. ein auffälliger "Download"-Button) leiten den Nutzer.

Extras: „Dark Mode“-Unterstützung und eine kleine Animation beim Hochladen und Verarbeiten des Bildes, um Feedback zu geben.
---

## 6. Milestones

Woche 1 (Logik & Bildverarbeitung): Programmierung der Core-Funktion mit JavaScript (HTML5 Canvas), um das Bild im Browser zu skalieren, ohne an Qualität zu verlieren.

Woche 2 (Struktur & Export): Implementierung der ZIP-Generierung (z. B. mit der Bibliothek JSZip)

Woche 3 (UI/UX Design): Gestaltung der Benutzeroberfläche mit HTML/CSS, Einbau der Live-Vorschau und Optimierung der Benutzerführung.

Woche 4 (Testing & Deployment): Testen mit verschiedenen Bildformaten, Beheben von Fehlern und Vorbereitung der finalen Präsentation.