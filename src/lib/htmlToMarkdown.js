// Convert HTML to Markdown
export function htmlToMarkdown(html) {
  // Create a temporary element to parse HTML
  const temp = document.createElement('div')
  temp.innerHTML = html
  
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
      
      // Table - simple conversion
      case 'table': {
        const rows = Array.from(node.querySelectorAll('tr'))
        if (rows.length === 0) return ''
        
        const table = rows.map(row => {
          const cells = Array.from(row.querySelectorAll('td, th'))
          return '| ' + cells.map(cell => convertNode(cell).trim()).join(' | ') + ' |'
        }).join('\n')
        
        // Add header separator if first row has th elements
        if (rows[0] && rows[0].querySelector('th')) {
          const headerCells = rows[0].querySelectorAll('th, td').length
          const separator = '| ' + Array(headerCells).fill('---').join(' | ') + ' |'
          const lines = table.split('\n')
          lines.splice(1, 0, separator)
          return lines.join('\n') + '\n\n'
        }
        
        return table + '\n\n'
      }
      
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
  
  return markdown
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