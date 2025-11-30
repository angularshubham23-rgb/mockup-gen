import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addNode, selectNode, moveNode } from '../store/slices/editorSlice'

export default function EditorCanvas(){
  const nodes = useSelector(s=>s.editor.nodes)
  const dispatch = useDispatch()

  function onDrop(ev){
    ev.preventDefault()
    const type = ev.dataTransfer.getData('component-type')
    const rect = ev.currentTarget.getBoundingClientRect()
    const left = Math.round(ev.clientX - rect.left)
    const top = Math.round(ev.clientY - rect.top)
    if (type) dispatch(addNode({ type, x: left, y: top }))
  }

  function onDragOver(e){ e.preventDefault() }

  return (
    <div className="editor-canvas" onDragOver={onDragOver} onDrop={onDrop}>
      <div className="canvas-grid" style={{position:'relative'}}>
        {nodes.map(n=> (
          <div key={n.id} style={{position:'absolute', left:n.x, top:n.y}} onClick={()=>dispatch(selectNode(n.id))} className="canvas-node">
            <RenderNode node={n} />
          </div>
        ))}
      </div>
    </div>
  )
}

function RenderNode({node}){
  const base = { padding:8, borderRadius:6, background:'#fff', boxShadow:'0 1px 2px rgba(0,0,0,0.06)'}
  if (node.type === 'Header') return <div style={{...base,fontWeight:700,fontSize:18}}>Header Title</div>
  if (node.type === 'Card') return <div style={{...base,width:220}}>Card heading<br/><small>Card content</small></div>
  if (node.type === 'Button') return <button style={{padding:'8px 12px', background:'#4A90E2', color:'#fff', border:'none', borderRadius:6}}>Primary</button>
  if (node.type === 'Input') return <input placeholder="Type..." style={{padding:8,borderRadius:6,border:'1px solid #ddd'}} />
  return <div style={base}>{node.type}</div>
}
