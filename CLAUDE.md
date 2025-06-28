# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LinkedIn Markdown Formatter - A React application that converts markdown text to LinkedIn-compatible formatted text using Unicode characters. The project is designed to work around LinkedIn's limited text formatting capabilities by using special Unicode characters for styling.

## Project Setup & Commands

**Note**: This project is currently missing its build configuration. Before development:

1. Initialize the project with a package.json and install dependencies
2. Set up a build tool (Vite recommended based on import patterns)
3. Create the missing src directory structure

### Expected Dependencies (based on imports)
- react
- react-dom
- lucide-react
- sonner
- @shadcn/ui components (or similar component library)
- Tailwind CSS

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

## Key Features to Implement

Based on project documentation:
1. Real-time markdown to LinkedIn format conversion
2. Support for bold, italic, headers, lists, and code blocks
3. Copy to clipboard functionality
4. Preview pane showing formatted output
5. Character count for LinkedIn's limits
6. History/undo functionality