// Convert HTML to Markdown
export function htmlToMarkdown(html) {
  // Create a temporary element to parse HTML
  const temp = document.createElement('div')
  temp.innerHTML = html
  
  // Track unsupported features
  const unsupportedFeatures = new Set()
  
  // Convert recursively
  function convertNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent
    }
    
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return ''
    }
    
    const tag = node.tagName.toLowerCase()
    const children = Array.from(node.childNodes).map(convertNode).join('')
    
    switch (tag) {
      // Headers
      case 'h1': return `# ${children}\n\n`
      case 'h2': return `## ${children}\n\n`
      case 'h3': return `### ${children}\n\n`
      case 'h4': return `#### ${children}\n\n`
      case 'h5': return `##### ${children}\n\n`
      case 'h6': return `###### ${children}\n\n`
      
      // Text formatting
      case 'strong':
      case 'b': return `**${children}**`
      case 'em':
      case 'i': return `*${children}*`
      case 'del':
      case 's':
      case 'strike': return `~~${children}~~`
      case 'code': return `\`${children}\``
      
      // Links
      case 'a': {
        const href = node.getAttribute('href')
        if (href) {
          return `[${children}](${href})`
        }
        return children
      }
      
      // Lists
      case 'ul': {
        return Array.from(node.children)
          .filter(child => child.tagName === 'LI')
          .map(li => `- ${convertNode(li).trim()}`)
          .join('\n') + '\n\n'
      }
      case 'ol': {
        return Array.from(node.children)
          .filter(child => child.tagName === 'LI')
          .map((li, index) => `${index + 1}. ${convertNode(li).trim()}`)
          .join('\n') + '\n\n'
      }
      case 'li': return children
      
      // Paragraphs and line breaks
      case 'p': return `${children}\n\n`
      case 'br': return '\n'
      case 'hr': return '\n---\n\n'
      
      // Blockquotes
      case 'blockquote': {
        return children.split('\n')
          .filter(line => line.trim())
          .map(line => `> ${line}`)
          .join('\n') + '\n\n'
      }
      
      // Code blocks
      case 'pre': {
        const code = node.querySelector('code')
        if (code) {
          return `\`\`\`\n${code.textContent}\n\`\`\`\n\n`
        }
        return `\`\`\`\n${children}\n\`\`\`\n\n`
      }
      
      // Divs and spans - just return content
      case 'div':
      case 'span':
      case 'section':
      case 'article':
        return children
      
      // Table - LinkedIn doesn't support tables
      case 'table': {
        unsupportedFeatures.add('tables')
        const rows = Array.from(node.querySelectorAll('tr'))
        if (rows.length === 0) return ''
        
        // Convert to simple text format
        const table = rows.map(row => {
          const cells = Array.from(row.querySelectorAll('td, th'))
          return cells.map(cell => convertNode(cell).trim()).join(' | ')
        }).join('\n')
        
        return table + '\n\n'
      }
      
      // Images - LinkedIn doesn't support inline images in text posts
      case 'img': {
        unsupportedFeatures.add('images')
        const alt = node.getAttribute('alt') || 'image'
        const src = node.getAttribute('src')
        return `[${alt}](${src})`
      }
      
      // Videos/iframes - not supported
      case 'video':
      case 'iframe':
      case 'embed':
        unsupportedFeatures.add('embedded media')
        return '[Embedded media not supported]\n\n'
        
      // Underline - not supported in LinkedIn
      case 'u':
        unsupportedFeatures.add('underline')
        return children
        
      // Subscript/Superscript - not supported
      case 'sub':
      case 'sup':
        unsupportedFeatures.add('subscript/superscript')
        return children
      
      default:
        return children
    }
  }
  
  // Convert and clean up
  let markdown = convertNode(temp)
  
  // Clean up excessive newlines
  markdown = markdown.replace(/\n{3,}/g, '\n\n')
  
  // Trim whitespace
  markdown = markdown.trim()
  
  return {
    markdown,
    unsupportedFeatures: Array.from(unsupportedFeatures)
  }
}

// Detect if text is already Markdown
export function isMarkdown(text) {
  // Check for common Markdown patterns
  const markdownPatterns = [
    /^#{1,6}\s/m,              // Headers
    /\*\*[^*]+\*\*/,           // Bold
    /\*[^*]+\*/,               // Italic
    /\[[^\]]+\]\([^)]+\)/,     // Links
    /^[-*+]\s/m,               // Unordered lists
    /^\d+\.\s/m,               // Ordered lists
    /^>\s/m,                   // Blockquotes
    /`[^`]+`/,                 // Inline code
    /```[\s\S]*```/,           // Code blocks
    /~~[^~]+~~/,               // Strikethrough
  ]
  
  return markdownPatterns.some(pattern => pattern.test(text))
}