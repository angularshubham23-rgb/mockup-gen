import { describe, it, expect } from 'vitest'
import editorReducer, { addNode, selectNode, updateNodeProp } from './editorSlice'

describe('editor slice', () => {
  it('adds nodes and updates props', () => {
    let state = editorReducer(undefined, { type: 'unknown' })
    state = editorReducer(state, addNode({ type: 'Button', x: 10, y: 20 }))
    expect(state.nodes.length).toBe(1)
    const id = state.nodes[0].id
    state = editorReducer(state, selectNode(id))
    expect(state.selected).toBe(id)
    state = editorReducer(state, updateNodeProp({ id, key: 'label', value: 'Okay' }))
    expect(state.nodes[0].props.label).toBe('Okay')
  })
})
