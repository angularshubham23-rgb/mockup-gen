import React from 'react'
import EditorSidebar from '../ui/EditorSidebar'
import EditorCanvas from '../ui/EditorCanvas'
import EditorInspector from '../ui/EditorInspector'
import './editor.css'

export default function Editor(){
  return (
    <div className="editor-root">
      <EditorSidebar />
      <EditorCanvas />
      <EditorInspector />
    </div>
  )
}
