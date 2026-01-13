// State management
let files = [];

// DOM elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const uploadBtn = document.getElementById('uploadBtn');
const uploadBtnText = document.getElementById('uploadBtnText');
const clearBtn = document.getElementById('clearBtn');
const serverUrlInput = document.getElementById('serverUrl');
const instructionsInput = document.getElementById('instructions');
const statusContainer = document.getElementById('statusContainer');

// Drag and drop handlers
dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

// File handling
function handleFiles(newFiles) {
    const fileArray = Array.from(newFiles);
    files = [...files, ...fileArray];
    renderFileList();
    updateUploadButton();
}

function renderFileList() {
    fileList.innerHTML = files.map((file, index) => `
        <div class="file-item">
            <div class="file-info">
                <span class="file-icon">${getFileIcon(file.name)}</span>
                <div class="file-details">
                    <h4>${file.name}</h4>
                    <p>${formatFileSize(file.size)}</p>
                </div>
            </div>
            <button class="remove-btn" onclick="removeFile(${index})">Remove</button>
        </div>
    `).join('');
}

function removeFile(index) {
    files.splice(index, 1);
    renderFileList();
    updateUploadButton();
}

function updateUploadButton() {
    uploadBtn.disabled = files.length === 0;
}

function getFileIcon(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const iconMap = {
        'pdf': '📄',
        'doc': '📝',
        'docx': '📝',
        'txt': '📃',
        'jpg': '🖼️',
        'jpeg': '🖼️',
        'png': '🖼️',
        'gif': '🖼️',
        'zip': '🗜️',
        'mp3': '🎵',
        'mp4': '🎬',
        'csv': '📊',
        'json': '📋',
        'js': '⚡',
        'py': '🐍',
        'html': '🌐',
    };
    return iconMap[ext] || '📎';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function showStatus(message, type = 'info') {
    const icons = {
        success: '✓',
        error: '✗',
        info: 'ℹ'
    };
    
    statusContainer.innerHTML = `
        <div class="status-message ${type}">
            <span>${icons[type]}</span>
            <span>${message}</span>
        </div>
    `;
    
    if (type === 'success') {
        setTimeout(() => {
            statusContainer.innerHTML = '';
        }, 5000);
    }
}

// Upload handler
async function uploadFiles() {
    const serverUrl = serverUrlInput.value.trim();
    const instructions = instructionsInput.value.trim();

    if (!serverUrl) {
        showStatus('Please enter a valid MCP server URL', 'error');
        return;
    }

    if (files.length === 0) {
        showStatus('Please select at least one file', 'error');
        return;
    }

    // Disable button and show loading state
    uploadBtn.disabled = true;
    uploadBtnText.innerHTML = '<span class="loader"></span> Uploading...';

    try {
        const formData = new FormData();
        
        // Add files
        files.forEach((file, index) => {
            formData.append(`file_${index}`, file);
        });

        // Add instructions
        if (instructions) {
            formData.append('instructions', instructions);
        }

        // Add metadata
        formData.append('metadata', JSON.stringify({
            timestamp: new Date().toISOString(),
            fileCount: files.length,
            totalSize: files.reduce((sum, file) => sum + file.size, 0)
        }));

        const response = await fetch(serverUrl, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
        }

        const result = await response.json();
        showStatus(`Successfully uploaded ${files.length} file(s) to MCP server`, 'success');
        
        // Clear files after successful upload
        files = [];
        renderFileList();
        instructionsInput.value = '';
        
    } catch (error) {
        showStatus(`Upload failed: ${error.message}`, 'error');
        console.error('Upload error:', error);
    } finally {
        uploadBtn.disabled = false;
        uploadBtnText.textContent = 'Upload to MCP';
        updateUploadButton();
    }
}

// Clear all handler
function clearAll() {
    files = [];
    renderFileList();
    instructionsInput.value = '';
    statusContainer.innerHTML = '';
    updateUploadButton();
    showStatus('All files cleared', 'info');
}

// Event listeners
uploadBtn.addEventListener('click', uploadFiles);
clearBtn.addEventListener('click', clearAll);

// Make removeFile available globally
window.removeFile = removeFile;
