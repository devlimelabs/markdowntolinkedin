export class UndoRedoManager {
  constructor(maxHistorySize = 50) {
    this.history = []
    this.currentIndex = -1
    this.maxHistorySize = maxHistorySize
    this.isUndoingOrRedoing = false
  }

  saveState(value, selectionStart, selectionEnd) {
    // Don't save if we're in the middle of undo/redo
    if (this.isUndoingOrRedoing) return

    const state = {
      value,
      selectionStart,
      selectionEnd,
      timestamp: Date.now()
    }

    // If we're not at the end of history, remove everything after current index
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1)
    }

    // Add the new state
    this.history.push(state)

    // Keep history size in check
    if (this.history.length > this.maxHistorySize) {
      this.history.shift()
    } else {
      this.currentIndex++
    }
  }

  canUndo() {
    return this.currentIndex > 0
  }

  canRedo() {
    return this.currentIndex < this.history.length - 1
  }

  undo() {
    if (!this.canUndo()) return null

    this.isUndoingOrRedoing = true
    this.currentIndex--
    const state = this.history[this.currentIndex]
    this.isUndoingOrRedoing = false
    
    return state
  }

  redo() {
    if (!this.canRedo()) return null

    this.isUndoingOrRedoing = true
    this.currentIndex++
    const state = this.history[this.currentIndex]
    this.isUndoingOrRedoing = false
    
    return state
  }

  getCurrentState() {
    if (this.currentIndex >= 0 && this.currentIndex < this.history.length) {
      return this.history[this.currentIndex]
    }
    return null
  }

  clear() {
    this.history = []
    this.currentIndex = -1
  }

  // Check if enough time has passed to create a new history entry
  shouldSaveState() {
    if (this.history.length === 0) return true
    
    const lastState = this.history[this.history.length - 1]
    const timeSinceLastSave = Date.now() - lastState.timestamp
    
    // Save state if more than 500ms has passed since last save
    return timeSinceLastSave > 500
  }
}