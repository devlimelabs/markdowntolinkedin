import { Button } from '@/components/ui/button.jsx'
import { Bold, Italic, Strikethrough, Link, List, ListOrdered, Code, Quote, Undo, Redo } from 'lucide-react'
import { formatBold, formatItalic, formatStrikethrough, formatLink, formatBulletList, formatNumberedList, formatCode, formatBlockquote } from '@/lib/textFormatting.js'

export default function FormattingToolbar({ textareaRef, value, onChange, undoRedoManager }) {
  const applyFormat = (formatFunc, promptForUrl = false) => {
    if (!textareaRef.current) return
    
    const textarea = textareaRef.current
    const { selectionStart, selectionEnd } = textarea
    
    let url = null
    if (promptForUrl) {
      url = prompt('Enter URL:', 'https://')
      if (!url) return
    }
    
    const result = formatFunc(value, selectionStart, selectionEnd, url)
    onChange(result.text)
    
    setTimeout(() => {
      textarea.setSelectionRange(result.newSelectionStart, result.newSelectionEnd)
      textarea.focus()
    }, 0)
  }
  
  const handleUndo = () => {
    const state = undoRedoManager.undo()
    if (state) {
      onChange(state.value)
      setTimeout(() => {
        textareaRef.current.setSelectionRange(state.selectionStart, state.selectionEnd)
        textareaRef.current.focus()
      }, 0)
    }
  }
  
  const handleRedo = () => {
    const state = undoRedoManager.redo()
    if (state) {
      onChange(state.value)
      setTimeout(() => {
        textareaRef.current.setSelectionRange(state.selectionStart, state.selectionEnd)
        textareaRef.current.focus()
      }, 0)
    }
  }
  
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
  const modKey = isMac ? '⌘' : 'Ctrl+'
  
  const buttons = [
    {
      icon: Bold,
      tooltip: `Bold (${modKey}B)`,
      onClick: () => applyFormat(formatBold),
      ariaLabel: 'Bold'
    },
    {
      icon: Italic,
      tooltip: `Italic (${modKey}I)`,
      onClick: () => applyFormat(formatItalic),
      ariaLabel: 'Italic'
    },
    {
      icon: Strikethrough,
      tooltip: `Strikethrough (${modKey}Shift+S)`,
      onClick: () => applyFormat(formatStrikethrough),
      ariaLabel: 'Strikethrough'
    },
    {
      icon: Link,
      tooltip: `Link (${modKey}K)`,
      onClick: () => applyFormat(formatLink, true),
      ariaLabel: 'Insert link'
    },
    { divider: true },
    {
      icon: List,
      tooltip: 'Bullet list',
      onClick: () => applyFormat(formatBulletList),
      ariaLabel: 'Bullet list'
    },
    {
      icon: ListOrdered,
      tooltip: 'Numbered list',
      onClick: () => applyFormat(formatNumberedList),
      ariaLabel: 'Numbered list'
    },
    {
      icon: Quote,
      tooltip: 'Quote',
      onClick: () => applyFormat(formatBlockquote),
      ariaLabel: 'Quote'
    },
    {
      icon: Code,
      tooltip: 'Inline code',
      onClick: () => applyFormat(formatCode),
      ariaLabel: 'Inline code'
    },
    { divider: true },
    {
      icon: Undo,
      tooltip: `Undo (${modKey}Z)`,
      onClick: handleUndo,
      ariaLabel: 'Undo',
      disabled: !undoRedoManager.canUndo()
    },
    {
      icon: Redo,
      tooltip: `Redo (${modKey}${isMac ? 'Shift+Z' : 'Y'})`,
      onClick: handleRedo,
      ariaLabel: 'Redo',
      disabled: !undoRedoManager.canRedo()
    }
  ]
  
  return (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b rounded-t-lg">
      {buttons.map((button, index) => {
        if (button.divider) {
          return <div key={index} className="w-px h-6 bg-gray-300 mx-1 hidden sm:block" />
        }
        
        const Icon = button.icon
        return (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={button.onClick}
            disabled={button.disabled}
            className="h-8 w-8 p-0 flex-shrink-0"
            title={button.tooltip}
            aria-label={button.ariaLabel}
          >
            <Icon className="h-4 w-4" />
          </Button>
        )
      })}
    </div>
  )
}