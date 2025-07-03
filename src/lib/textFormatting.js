// Text formatting utilities for markdown

export function wrapSelection(text, selectionStart, selectionEnd, wrapper, wrapperEnd = null) {
  const before = text.substring(0, selectionStart)
  const selected = text.substring(selectionStart, selectionEnd)
  const after = text.substring(selectionEnd)
  
  const endWrapper = wrapperEnd || wrapper
  
  return {
    text: before + wrapper + selected + endWrapper + after,
    newSelectionStart: selectionStart + wrapper.length,
    newSelectionEnd: selectionEnd + wrapper.length
  }
}

export function toggleWrapping(text, selectionStart, selectionEnd, wrapper, wrapperEnd = null) {
  const endWrapper = wrapperEnd || wrapper
  const before = text.substring(0, selectionStart)
  const selected = text.substring(selectionStart, selectionEnd)
  const after = text.substring(selectionEnd)
  
  // Check if already wrapped
  const beforeWrapped = before.endsWith(wrapper) && after.startsWith(endWrapper)
  const insideWrapped = selected.startsWith(wrapper) && selected.endsWith(endWrapper)
  
  if (beforeWrapped) {
    // Remove wrapping
    return {
      text: before.slice(0, -wrapper.length) + selected + after.slice(endWrapper.length),
      newSelectionStart: selectionStart - wrapper.length,
      newSelectionEnd: selectionEnd - wrapper.length
    }
  } else if (insideWrapped) {
    // Remove wrapping
    return {
      text: before + selected.slice(wrapper.length, -endWrapper.length) + after,
      newSelectionStart: selectionStart,
      newSelectionEnd: selectionEnd - wrapper.length - endWrapper.length
    }
  } else {
    // Add wrapping
    return wrapSelection(text, selectionStart, selectionEnd, wrapper, wrapperEnd)
  }
}

export function formatBold(text, selectionStart, selectionEnd) {
  return toggleWrapping(text, selectionStart, selectionEnd, '**')
}

export function formatItalic(text, selectionStart, selectionEnd) {
  return toggleWrapping(text, selectionStart, selectionEnd, '*')
}

export function formatStrikethrough(text, selectionStart, selectionEnd) {
  return toggleWrapping(text, selectionStart, selectionEnd, '~~')
}

export function formatLink(text, selectionStart, selectionEnd, url = '') {
  const before = text.substring(0, selectionStart)
  const selected = text.substring(selectionStart, selectionEnd) || 'link text'
  const after = text.substring(selectionEnd)
  
  const linkUrl = url || 'https://example.com'
  
  return {
    text: before + `[${selected}](${linkUrl})` + after,
    newSelectionStart: selectionStart + 1,
    newSelectionEnd: selectionStart + 1 + selected.length
  }
}

export function formatBulletList(text, selectionStart, selectionEnd) {
  const before = text.substring(0, selectionStart)
  const selected = text.substring(selectionStart, selectionEnd)
  const after = text.substring(selectionEnd)
  
  // Find the start of the current line
  let lineStart = selectionStart
  while (lineStart > 0 && text[lineStart - 1] !== '\n') {
    lineStart--
  }
  
  // Check if already a bullet list
  const currentLine = text.substring(lineStart, selectionEnd)
  if (currentLine.startsWith('- ') || currentLine.startsWith('* ') || currentLine.startsWith('+ ')) {
    // Remove bullet
    const newText = text.substring(0, lineStart) + currentLine.substring(2) + after
    return {
      text: newText,
      newSelectionStart: selectionStart - 2,
      newSelectionEnd: selectionEnd - 2
    }
  } else {
    // Add bullet
    const newText = text.substring(0, lineStart) + '- ' + currentLine + after
    return {
      text: newText,
      newSelectionStart: selectionStart + 2,
      newSelectionEnd: selectionEnd + 2
    }
  }
}

export function formatNumberedList(text, selectionStart, selectionEnd) {
  const before = text.substring(0, selectionStart)
  const selected = text.substring(selectionStart, selectionEnd)
  const after = text.substring(selectionEnd)
  
  // Find the start of the current line
  let lineStart = selectionStart
  while (lineStart > 0 && text[lineStart - 1] !== '\n') {
    lineStart--
  }
  
  // Check if already a numbered list
  const currentLine = text.substring(lineStart, selectionEnd)
  const numberedListRegex = /^\d+\.\s/
  if (numberedListRegex.test(currentLine)) {
    // Remove numbering
    const newText = text.substring(0, lineStart) + currentLine.replace(numberedListRegex, '') + after
    const removedLength = currentLine.match(numberedListRegex)[0].length
    return {
      text: newText,
      newSelectionStart: selectionStart - removedLength,
      newSelectionEnd: selectionEnd - removedLength
    }
  } else {
    // Add numbering
    const newText = text.substring(0, lineStart) + '1. ' + currentLine + after
    return {
      text: newText,
      newSelectionStart: selectionStart + 3,
      newSelectionEnd: selectionEnd + 3
    }
  }
}

export function formatCode(text, selectionStart, selectionEnd) {
  return toggleWrapping(text, selectionStart, selectionEnd, '`')
}

export function formatBlockquote(text, selectionStart, selectionEnd) {
  const before = text.substring(0, selectionStart)
  const selected = text.substring(selectionStart, selectionEnd)
  const after = text.substring(selectionEnd)
  
  // Find the start of the current line
  let lineStart = selectionStart
  while (lineStart > 0 && text[lineStart - 1] !== '\n') {
    lineStart--
  }
  
  // Check if already a blockquote
  const currentLine = text.substring(lineStart, selectionEnd)
  if (currentLine.startsWith('> ')) {
    // Remove blockquote
    const newText = text.substring(0, lineStart) + currentLine.substring(2) + after
    return {
      text: newText,
      newSelectionStart: selectionStart - 2,
      newSelectionEnd: selectionEnd - 2
    }
  } else {
    // Add blockquote
    const newText = text.substring(0, lineStart) + '> ' + currentLine + after
    return {
      text: newText,
      newSelectionStart: selectionStart + 2,
      newSelectionEnd: selectionEnd + 2
    }
  }
}