import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateNodeProp } from '../store/slices/editorSlice'

export default function EditorInspector(){
  const selectedId = useSelector(s=>s.editor.selected)
  const node = useSelector(s => s.editor.nodes.find(n=>n.id===selectedId))
  const dispatch = useDispatch()

  if (!node) return (
    <aside className="editor-inspector"><div style={{padding:12}}>Select a component to edit</div></aside>
  )

  return (
    <aside className="editor-inspector">
      <h3>Inspector</h3>
      <div style={{padding:8}}>
        <div><strong>Type:</strong> {node.type}</div>
        <div style={{marginTop:8}}>
          <label>Label</label>
          <input value={node.props.label || ''} onChange={(e)=>dispatch(updateNodeProp({id:node.id, key:'label', value:e.target.value }))} />
        </div>
      </div>
    </aside>
  )
}
