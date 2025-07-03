import { useEffect, useRef } from 'react'
import { Bold, Italic, Strikethrough, Link, List, ListOrdered, Quote, Code } from 'lucide-react'

export default function ContextMenu({ isOpen, position, onClose, onAction }) {
  const menuRef = useRef(null)
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose()
      }
    }
    
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])
  
  if (!isOpen) return null
  
  const menuItems = [
    { icon: Bold, label: 'Bold', action: 'bold' },
    { icon: Italic, label: 'Italic', action: 'italic' },
    { icon: Strikethrough, label: 'Strikethrough', action: 'strikethrough' },
    { icon: Link, label: 'Link', action: 'link' },
    { divider: true },
    { icon: List, label: 'Bullet List', action: 'bulletList' },
    { icon: ListOrdered, label: 'Numbered List', action: 'numberedList' },
    { icon: Quote, label: 'Quote', action: 'quote' },
    { icon: Code, label: 'Code', action: 'code' }
  ]
  
  // Adjust position to keep menu within viewport
  const adjustedPosition = { ...position }
  if (menuRef.current) {
    const rect = menuRef.current.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    
    if (position.x + rect.width > viewportWidth) {
      adjustedPosition.x = viewportWidth - rect.width - 10
    }
    
    if (position.y + rect.height > viewportHeight) {
      adjustedPosition.y = viewportHeight - rect.height - 10
    }
  }
  
  return (
    <div
      ref={menuRef}
      className="fixed z-50 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[160px]"
      style={{
        left: `${adjustedPosition.x}px`,
        top: `${adjustedPosition.y}px`
      }}
    >
      {menuItems.map((item, index) => {
        if (item.divider) {
          return <div key={index} className="h-px bg-gray-200 my-1" />
        }
        
        const Icon = item.icon
        return (
          <button
            key={index}
            className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 flex items-center gap-2"
            onClick={() => {
              onAction(item.action)
              onClose()
            }}
          >
            <Icon className="h-4 w-4 text-gray-600" />
            <span>{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}