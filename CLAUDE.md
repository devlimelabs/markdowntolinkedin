# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LinkedIn Markdown Formatter - A React application that converts markdown text to LinkedIn-compatible formatted text using Unicode characters. The project is designed to work around LinkedIn's limited text formatting capabilities by using special Unicode characters for styling.

## Project Setup & Commands

### Development Commands
```bash
npm install       # Install dependencies
npm run dev       # Start development server (http://localhost:5173)
npm run build     # Build for production
npm run preview   # Preview production build
npm run deploy    # Build and deploy to Firebase
```

### Dependencies
- react & react-dom
- lucide-react (icons)
- sonner (toast notifications)
- clsx & tailwind-merge (utility functions)
- Tailwind CSS
- Vite (build tool)

## Architecture & Key Components

### Unicode Conversion System
The core functionality involves mapping markdown syntax to Unicode equivalents:
- **Bold**: Regular text → Mathematical Bold Unicode characters
- **Italic**: Regular text → Mathematical Italic Unicode characters
- **Headers**: Using special Unicode characters for visual hierarchy
- **Lists**: Unicode bullet points and special markers

### Component Structure
The app uses shadcn/ui component patterns with imports like:
```javascript
import { Button } from '@/components/ui/button.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
```

### Firebase Deployment
- Configured for Firebase Hosting
- Serves from the `public` directory
- Project ID: `markdowntolinkedin`

## Development Guidelines

1. **Unicode Handling**: When implementing text conversion features, ensure proper Unicode character mapping and fallback handling for unsupported characters.

2. **State Management**: The app uses React hooks for state management. Keep conversion logic separate from UI components.

3. **Performance**: Text conversion should be real-time. Use debouncing for large text inputs.

4. **Accessibility**: Ensure converted text remains accessible and can be copied/pasted correctly.

## Current Project State

The project has comprehensive documentation in the `/docs` directory but is missing its actual implementation. The existing files (App.jsx, App.css, index.html) have been cleared and need to be rebuilt according to the specifications in the documentation.

## Key Features Implemented

1. Real-time markdown to LinkedIn format conversion
2. Support for bold, italic, headers, lists, and code blocks
3. Copy to clipboard functionality
4. Preview pane showing formatted output (desktop/mobile views)
5. Character count for LinkedIn's limits
6. File drag-and-drop support
7. Email to self functionality
8. Download as text file
9. **Sliding side navigation guide** with:
   - Markdown syntax reference
   - Accessibility guidelines
   - Keyboard shortcut support (press ? to open)