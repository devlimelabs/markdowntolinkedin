# LinkedIn Markdown Formatter

[![Live Demo](https://img.shields.io/badge/Live%20Demo-markdowntolinkedin.com-blue)](https://markdowntolinkedin.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-5.3.1-646CFF?logo=vite)](https://vitejs.dev)

A powerful React application that converts Markdown documents to LinkedIn-compatible formatted text using Unicode characters. Transform your documentation, blog posts, and technical content into beautifully formatted LinkedIn posts with just one click.

## 🚀 Features

### Core Functionality
- **Real-time Markdown conversion** - See your formatted text update instantly as you type
- **Auto-conversion from rich text** - Paste from Word, Google Docs, or any website and automatically convert to Markdown
- **Full Markdown support** - Headers, bold, italic, strikethrough, links, lists, code blocks, and blockquotes
- **Unicode formatting** - Uses mathematical Unicode characters for bold/italic text that displays correctly on LinkedIn
- **Live preview** - See exactly how your post will look on LinkedIn with desktop and mobile views

### User Experience
- **Drag & drop support** - Drop .md files directly into the editor
- **Keyboard shortcuts** - Quick formatting with Ctrl+B, Ctrl+I, Ctrl+K, etc.
- **Context menu** - Right-click selected text for formatting options
- **Formatting toolbar** - Visual buttons for all formatting options
- **Undo/Redo** - Full undo/redo support with Ctrl+Z/Ctrl+Y

### Export & Sharing
- **One-click copy** - Copy formatted text to clipboard
- **Download as text** - Save your formatted content as a .txt file
- **Email to self** - Send content via email for later use
- **Character count** - Real-time LinkedIn character limit tracking (3,000 characters)

### Advanced Features
- **LinkedIn compatibility warnings** - Alerts for unsupported features
- **Mobile-responsive design** - Works seamlessly on all devices
- **Sliding side guide** - Built-in help with Markdown syntax reference
- **Analytics tracking** - Usage analytics via Firebase (privacy-focused)

## 📸 Demo

![LinkedIn Markdown Formatter Demo](docs/images/app-screenshot.png)

*Transform your Markdown content into LinkedIn-ready posts with real-time preview*

## 🛠️ Installation

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager

### Quick Start

```bash
# Clone the repository
git clone https://github.com/devlimelabs/markdowntolinkedin.git
cd markdowntolinkedin

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Development

### Project Structure

```
markdowntolinkedin/
├── src/
│   ├── components/           # React components
│   │   ├── ui/              # Reusable UI components
│   │   ├── ContextMenu.jsx  # Right-click formatting menu
│   │   ├── FormattingToolbar.jsx  # Toolbar with formatting buttons
│   │   └── SideGuide.jsx    # Help guide sidebar
│   ├── lib/                 # Utility libraries
│   │   ├── firebase.js      # Analytics and tracking
│   │   ├── htmlToMarkdown.js  # HTML to Markdown conversion
│   │   ├── markdownChecker.js  # Feature validation
│   │   ├── textFormatting.js  # Text formatting utilities
│   │   └── undoRedoManager.js  # Undo/redo functionality
│   ├── App.jsx              # Main application component
│   └── main.jsx             # Application entry point
├── docs/                    # Project documentation
├── public/                  # Static assets
├── firebase.json           # Firebase hosting configuration
└── package.json           # Dependencies and scripts
```

### Available Scripts

```bash
npm run dev      # Start development server (http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
npm run deploy   # Build and deploy to Firebase
```

### Key Technologies

- **React 18.3.1** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **Sonner** - Toast notifications
- **Firebase** - Hosting and analytics

## 📖 Usage

### Basic Usage

1. **Enter Markdown**: Type or paste your Markdown content into the left editor
2. **See Preview**: Watch the LinkedIn-formatted preview update in real-time
3. **Copy Result**: Click "Copy to Clipboard" to copy the formatted text
4. **Post to LinkedIn**: Paste the formatted content directly into LinkedIn

### Advanced Features

#### Auto-Conversion
- Toggle the "Auto" button to automatically convert rich text from Word, Google Docs, or websites
- Paste formatted content and it will be automatically converted to Markdown first

#### Keyboard Shortcuts
- `Ctrl+B` - Bold selected text
- `Ctrl+I` - Italic selected text
- `Ctrl+K` - Create link from selected text
- `Ctrl+Shift+S` - Strikethrough selected text
- `Ctrl+Z` - Undo
- `Ctrl+Y` or `Ctrl+Shift+Z` - Redo
- `?` - Open help guide

#### File Operations
- Drag and drop `.md` files directly into the editor
- Use "Download Text" to save formatted content as a file
- Use "Email to Self" to send content via email

## 🎨 Formatting Examples

### Input (Markdown)
```markdown
# My LinkedIn Post

This is a **bold statement** and some *italic text*.

## Key Points

- First important point
- Second important point
- Third important point

Check out my [website](https://example.com) for more info!

> This is a quote that will be italicized
```

### Output (LinkedIn-formatted)
```
𝗠𝘆 𝗟𝗶𝗻𝗸𝗲𝗱𝗜𝗻 𝗣𝗼𝘀𝘁

This is a 𝗯𝗼𝗹𝗱 𝘀𝘁𝗮𝘁𝗲𝗺𝗲𝗻𝘁 and some 𝘪𝘵𝘢𝘭𝘪𝘤 𝘵𝘦𝘹𝘵.

𝗞𝗲𝘆 𝗣𝗼𝗶𝗻𝘁𝘀

● First important point
● Second important point
● Third important point

Check out my website (https://example.com) for more info!

𝘛𝘩𝘪𝘴 𝘪𝘴 𝘢 𝘲𝘶𝘰𝘵𝘦 𝘵𝘩𝘢𝘵 𝘸𝘪𝘭𝘭 𝘣𝘦 𝘪𝘵𝘢𝘭𝘪𝘤𝘪𝘻𝘦𝘥
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Install dependencies**: `npm install`
4. **Start development**: `npm run dev`
5. **Make your changes**
6. **Test thoroughly**
7. **Commit your changes**: `git commit -m 'Add amazing feature'`
8. **Push to branch**: `git push origin feature/amazing-feature`
9. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and patterns
- Add comments for complex logic
- Update documentation for new features
- Ensure all features work on both desktop and mobile
- Test with various Markdown inputs
- Check LinkedIn compatibility for new formatting features

### Code Style

- Use modern React patterns (hooks, functional components)
- Follow Tailwind CSS utility-first approach
- Use meaningful component and variable names
- Keep components focused and reusable
- Add proper error handling

### Bug Reports

When reporting bugs, please include:
- Steps to reproduce the issue
- Expected vs actual behavior
- Browser and device information
- Sample Markdown content that causes the issue

## 🔒 Privacy & Security

- **No data collection**: Your content never leaves your browser
- **Local processing**: All Markdown conversion happens client-side
- **Optional analytics**: Basic usage analytics via Firebase (no personal data)
- **No account required**: Use the tool completely anonymously

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Unicode Mathematical Characters** - For enabling beautiful formatting on LinkedIn
- **shadcn/ui** - For the excellent UI component patterns
- **Lucide React** - For the beautiful icons
- **Tailwind CSS** - For rapid UI development
- **Firebase** - For reliable hosting and analytics

## 📞 Support

- **Issues**: Report bugs and request features on [GitHub Issues](https://github.com/devlimelabs/markdowntolinkedin/issues)
- **Documentation**: Check the `/docs` directory for detailed documentation
- **Contact**: [Report Issues](https://www.linkedin.com/in/john-pribesh-61892027/)

## 🌟 Why This Tool?

LinkedIn's limited formatting options make it challenging to create visually appealing posts. This tool bridges that gap by:

- Converting standard Markdown to LinkedIn-compatible Unicode formatting
- Providing real-time preview so you know exactly how your post will look
- Supporting advanced features like auto-conversion from rich text
- Offering a seamless workflow from draft to published post

Perfect for:
- Technical content creators
- Documentation writers
- Blog post authors
- Anyone who wants professional-looking LinkedIn posts

---

**Made with ❤️ for the LinkedIn community**

[🚀 Try it now at markdowntolinkedin.com](https://markdowntolinkedin.com)