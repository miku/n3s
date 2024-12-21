const {
    contextBridge,
    ipcRenderer
} = require('electron');

const fs = require('fs');
const path = require('path');
const os = require('os');

contextBridge.exposeInMainWorld('api', {
    cwd: process.cwd(),
    findMarkdownFiles: findMarkdownFiles,
    transformText: transformText,
    generateText: generateText,
    saveFile: saveFile,
    loadFile: loadFile,
});

/**
 * Recursively finds all Markdown files in a directory.
 * @param {string} dir - The directory to search.
 * @returns {string[]} - A list of absolute paths to Markdown files.
 */
function findMarkdownFiles(dir) {
    let markdownFiles = [];

    // Read the contents of the directory
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const absolutePath = path.join(dir, file);
        const stat = fs.statSync(absolutePath);

        if (stat.isDirectory()) {
            // Recurse into subdirectories
            markdownFiles = markdownFiles.concat(findMarkdownFiles(absolutePath));
        } else if (stat.isFile() && (file.endsWith('.md') || file.endsWith('.markdown'))) {
            // Add Markdown files to the list
            markdownFiles.push(absolutePath);
        }
    }

    return markdownFiles;
}

function transformText(text) {
    const currentDate = new Date().toISOString().split('T')[0];
    // run various replacements:
    let result = text;
    result = result.replace(/LOREM/g, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");
    result = result.replace(/DATE/g, currentDate);
    return result
}


async function generateText(prompt, onToken = null) {
    const response = await fetch('http://k9:11434/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gemma',
            prompt: prompt,
        }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    let generatedText = '';

    try {
        while (true) {
            const {
                done,
                value
            } = await reader.read();

            if (done) {
                break;
            }

            // Convert the Uint8Array to a string
            const chunk = new TextDecoder().decode(value);

            // The response might contain multiple JSON objects
            const lines = chunk.split('\n').filter(line => line.trim());

            for (const line of lines) {
                try {
                    const data = JSON.parse(line);

                    // Call the callback with the new token if provided
                    if (onToken && data.response) {
                        onToken(data.response);
                    }

                    generatedText += data.response;

                    if (data.done) {
                        return generatedText;
                    }
                } catch (e) {
                    console.warn('Failed to parse JSON:', e);
                }
            }
        }
    } finally {
        reader.releaseLock();
    }

    return generatedText;
}

function saveFile(content) {
    const dirPath = path.join(os.homedir(), '.local/share/kami');
    fs.mkdirSync(dirPath, {
        recursive: true
    });
    const filePath = path.join(dirPath, 'scratch.md');
    fs.writeFileSync(filePath, content);
}

function loadFile(filename) {
    // TODO: prevent path attacks
    const filePath = path.join(os.homedir(), '.local/share/kami/', filename);
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        return content;
    } catch (err) {
        if (err.code === 'ENOENT') {
            return '';
        }
        throw err;
    }
}
