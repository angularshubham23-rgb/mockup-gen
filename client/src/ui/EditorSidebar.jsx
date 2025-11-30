import React from 'react'
const items = [
  { type: 'Header', label: 'Header' },
  { type: 'Card', label: 'Card' },
  { type: 'Button', label: 'Button' },
  { type: 'Input', label: 'Input' }
]

export default function EditorSidebar(){
  return (
    <aside className="editor-sidebar">
      <h3>Components</h3>
      <div className="items">
        {items.map(it => (
          <div key={it.type} className="draggable-item" draggable onDragStart={(e)=>{ e.dataTransfer.setData('component-type', it.type) }}>
            {it.label}
          </div>
        ))}
      </div>
    </aside>
  )
}
