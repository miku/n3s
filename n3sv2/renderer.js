document.addEventListener('DOMContentLoaded', () => {
    const statusBar = document.getElementById('status-bar');

    // Get the current directory using the API exposed by preload.js
    const currentDirectory = window.api.getCurrentDirectory();

    // Add the current directory to the status bar or log it
    const directoryElement = document.createElement('div');
    directoryElement.textContent = `Current Directory: ${currentDirectory}`;
    directoryElement.style.fontSize = '12px';
    statusBar.appendChild(directoryElement);
});

