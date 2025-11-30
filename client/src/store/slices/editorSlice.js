import { createSlice } from '@reduxjs/toolkit'

let nextId = 1

const editorSlice = createSlice({
  name: 'editor',
  initialState: { nodes: [], selected: null },
  reducers: {
    addNode(state, action){
      const { type, x = 40, y = 40 } = action.payload
      state.nodes.push({ id: String(nextId++), type, x, y, props: {} })
    },
    selectNode(state, action){ state.selected = action.payload },
    updateNodeProp(state, action){
      const { id, key, value } = action.payload
      const node = state.nodes.find(n=>n.id===id)
      if (node) node.props[key]=value
    },
    moveNode(state, action){
      const { id, x, y } = action.payload
      const node = state.nodes.find(n=>n.id===id)
      if (node){ node.x=x; node.y=y }
    }
  }
})

export const { addNode, selectNode, updateNodeProp, moveNode } = editorSlice.actions
export default editorSlice.reducer
