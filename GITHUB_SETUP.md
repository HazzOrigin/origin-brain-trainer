# GitHub Repository Setup Guide

Follow these steps to push your Origin Brain Trainer to GitHub:

## 1. Create a New Repository on GitHub

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `origin-brain-trainer`
3. Description: "A sophisticated drag-and-drop file uploader for Model Context Protocol (MCP) servers"
4. Select "Public" (or Private if preferred)
5. **Do NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## 2. Push Your Local Repository

```bash
# Navigate to your repository
cd origin-brain-trainer

# Add the remote repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/origin-brain-trainer.git

# Push to GitHub
git push -u origin main
```

## 3. Verify Upload

Visit your repository at: `https://github.com/YOUR_USERNAME/origin-brain-trainer`

You should see all files including:
- index.html
- styles.css
- script.js
- README.md
- LICENSE
- DEPLOYMENT.md
- package.json
- .gitignore

## 4. Enable GitHub Pages (Optional)

To host your project live:

1. Go to repository Settings
2. Scroll to "Pages" section
3. Under "Source", select "main" branch
4. Click "Save"
5. Your site will be live at: `https://YOUR_USERNAME.github.io/origin-brain-trainer/`

## 5. Add Topics (Optional)

Make your repository more discoverable:

1. Click the gear icon next to "About"
2. Add topics: `mcp`, `file-upload`, `drag-drop`, `ai-training`, `javascript`
3. Click "Save changes"

## 6. Create a Release (Optional)

Tag your first version:

```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

Then on GitHub:
1. Go to "Releases"
2. Click "Draft a new release"
3. Select tag "v1.0.0"
4. Title: "Origin Brain Trainer v1.0.0"
5. Describe the release
6. Click "Publish release"

## 7. Collaboration Setup (Optional)

If working with a team:

1. Go to Settings → Collaborators
2. Add team members by username/email
3. Set appropriate permissions

## Troubleshooting

**Authentication Issues:**
```bash
# Use GitHub CLI for easier authentication
gh auth login

# Or use personal access token
# Settings → Developer settings → Personal access tokens
```

**Push Rejected:**
```bash
# If someone else pushed first
git pull origin main --rebase
git push origin main
```

**Large Files:**
```bash
# If you have files > 100MB, use Git LFS
git lfs install
git lfs track "*.large_extension"
git add .gitattributes
```

## Next Steps

- Set up branch protection rules
- Configure GitHub Actions for CI/CD
- Add issue templates
- Create a CONTRIBUTING.md guide
- Set up GitHub Discussions

---

Your Origin Brain Trainer is now on GitHub! 🎉
