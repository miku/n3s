const {
	contextBridge,
	ipcRenderer
} = require('electron');

const fs = require('fs');
const path = require('path');

contextBridge.exposeInMainWorld('api', {
	cwd: process.cwd(),
	findMarkdownFiles: findMarkdownFiles,
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
