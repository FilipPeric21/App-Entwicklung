
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const fileInfo = document.getElementById('file-info');
const filenameDisplay = document.getElementById('filename-display');

// 1. Klick-Event: Wenn man auf die Box klickt, öffnet sich der Explorer
dropZone.addEventListener('click', () => fileInput.click());

// 2. Change-Event: Wenn eine Datei über den Explorer gewählt wurde
fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

// 3. Drag-Over: Verhindert, dass der Browser das Bild einfach nur öffnet
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('bg-white'); // Optisches Feedback
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('bg-white');
});

// 4. Drop-Event: Wenn die Datei reingezogen wird
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('bg-white');
    const files = e.dataTransfer.files;
    handleFiles(files);
});

// Funktion zur Verarbeitung der Datei
function handleFiles(files) {
    if (files.length > 0) {
        const file = files[0];
        filenameDisplay.textContent = "Ausgewählt: " + file.name;
        fileInfo.style.display = 'block';
        console.log("Datei bereit zur Verarbeitung:", file);
    }
}
