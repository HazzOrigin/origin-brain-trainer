# Origin Brain Trainer

<div align="center">

![Origin Brain Trainer](https://img.shields.io/badge/Origin-Brain%20Trainer-00d9ff?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-8b5cf6?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-ff6b35?style=for-the-badge)

**A sophisticated drag-and-drop file uploader for Model Context Protocol (MCP) servers**

[Features](#features) • [Demo](#demo) • [Installation](#installation) • [Usage](#usage) • [API](#api) • [Contributing](#contributing)

</div>

---

## 🚀 Features

- **Intuitive Drag & Drop** - Simply drag files onto the upload zone or click to browse
- **Batch Upload** - Upload multiple files simultaneously with a single request
- **Custom Instructions** - Add processing instructions that accompany your files to the MCP server
- **Server Configuration** - Easily configure your MCP server endpoint
- **Real-time Feedback** - Visual status updates for upload progress and results
- **File Management** - Preview, remove, and organize files before uploading
- **Modern Design** - Cyberpunk-inspired interface with smooth animations
- **Mobile Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- **Zero Dependencies** - Pure HTML, CSS, and JavaScript - no frameworks required

## 🎨 Demo

The Origin Brain Trainer features a distinctive dark cyberpunk aesthetic with:
- Animated gradient backgrounds
- Cyan, purple, and orange accent colors
- Smooth transitions and micro-interactions
- Custom typography (Fraunces serif + DM Mono)
- File type recognition with emoji icons

## 📦 Installation

### Option 1: Clone the Repository

```bash
git clone https://github.com/yourusername/origin-brain-trainer.git
cd origin-brain-trainer
```

### Option 2: Download ZIP

Download the latest release and extract it to your desired location.

### Option 3: Use as Static Site

Simply open `index.html` in your web browser - no build process required!

## 🔧 Usage

### Basic Setup

1. **Configure Your MCP Server**
   - Enter your MCP server endpoint URL in the "MCP Server Endpoint" field
   - Default: `https://your-mcp-server.com/upload`

2. **Add Files**
   - Drag and drop files onto the upload zone
   - Or click the upload zone to browse and select files
   - Add as many files as you need

3. **Add Instructions (Optional)**
   - Enter any processing instructions for the MCP server
   - Example: "Process these files and extract metadata, then index them for semantic search"

4. **Upload**
   - Click the "Upload to MCP" button
   - Wait for confirmation
   - Files are automatically cleared after successful upload

### Example Server Integration

The uploader sends a `multipart/form-data` POST request with the following structure:

```javascript
// Form Data Structure
{
  file_0: File,
  file_1: File,
  // ... additional files
  instructions: "Your custom instructions",
  metadata: {
    timestamp: "2025-01-13T10:30:00.000Z",
    fileCount: 2,
    totalSize: 1048576
  }
}
```

## 🔌 API

### Server Endpoint Requirements

Your MCP server should accept POST requests at the configured endpoint with the following:

**Request Format:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: FormData containing files, instructions, and metadata

**Expected Response:**
```json
{
  "success": true,
  "message": "Files uploaded successfully",
  "fileCount": 2,
  "processedIds": ["id1", "id2"]
}
```

### Example Server Implementation (Node.js/Express)

```javascript
const express = require('express');
const multer = require('multer');
const app = express();

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.any(), (req, res) => {
  const files = req.files;
  const instructions = req.body.instructions;
  const metadata = JSON.parse(req.body.metadata);
  
  // Process files with instructions
  console.log('Received files:', files.length);
  console.log('Instructions:', instructions);
  console.log('Metadata:', metadata);
  
  res.json({
    success: true,
    message: 'Files uploaded successfully',
    fileCount: files.length
  });
});

app.listen(3000, () => {
  console.log('MCP server running on port 3000');
});
```

## 🛠️ Customization

### Styling

All styles are contained in `styles.css`. Customize colors by modifying CSS variables:

```css
:root {
    --primary-bg: #0a0e14;
    --secondary-bg: #151922;
    --accent-cyan: #00d9ff;
    --accent-orange: #ff6b35;
    --accent-purple: #8b5cf6;
    --text-primary: #e6e8eb;
    --text-secondary: #8b96a5;
    --border-color: #1e2530;
    --success: #10b981;
    --error: #ef4444;
}
```

### File Type Icons

Modify the `getFileIcon()` function in `script.js` to add or change file type icons:

```javascript
const iconMap = {
    'pdf': '📄',
    'doc': '📝',
    'txt': '📃',
    // Add your custom mappings
};
```

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Issues

Found a bug? Have a feature request? Please open an issue on GitHub.

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

<div align="center">

**Made with 🧠 for the future of AI training**

</div>
