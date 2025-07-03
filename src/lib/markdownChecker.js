// Check markdown for LinkedIn-unsupported features
export function checkUnsupportedFeatures(markdown) {
  const unsupported = []
  
  // Check for table syntax
  if (/^\|.*\|$/m.test(markdown) || /^\s*\|?\s*:?-+:?\s*\|/m.test(markdown)) {
    unsupported.push('tables')
  }
  
  // Check for image syntax
  if (/!\[([^\]]*)\]\(([^)]+)\)/.test(markdown)) {
    unsupported.push('images')
  }
  
  // Check for HTML tags that might indicate unsupported content
  if (/<(table|img|video|iframe|embed|u|sub|sup|hr)\b/i.test(markdown)) {
    unsupported.push('HTML elements')
  }
  
  // Check for code blocks with language specification (LinkedIn doesn't support syntax highlighting)
  if (/^```\w+/m.test(markdown)) {
    unsupported.push('syntax highlighting')
  }
  
  // Check for footnotes
  if (/\[\^[\d\w]+\]/.test(markdown)) {
    unsupported.push('footnotes')
  }
  
  // Check for task lists
  if (/^[\s]*[-*+]\s+\[[x\s]\]/m.test(markdown)) {
    unsupported.push('task lists')
  }
  
  // Check for definition lists
  if (/^[^:]+\n:\s+/m.test(markdown)) {
    unsupported.push('definition lists')
  }
  
  return unsupported
}

// Get feature-specific warning messages
export function getFeatureWarning(feature) {
  const warnings = {
    'tables': 'Tables will be converted to plain text separated by pipes',
    'images': 'Images cannot be embedded in LinkedIn text posts',
    'HTML elements': 'HTML elements are not supported and will be converted or removed',
    'syntax highlighting': 'Code syntax highlighting is not available on LinkedIn',
    'footnotes': 'Footnotes are not supported on LinkedIn',
    'task lists': 'Task list checkboxes will be converted to regular list items',
    'definition lists': 'Definition lists will be converted to regular text'
  }
  
  return warnings[feature] || `${feature} is not supported on LinkedIn`
}