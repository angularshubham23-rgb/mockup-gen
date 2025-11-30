import { configureStore } from '@reduxjs/toolkit'
import mockupReducer from './slices/mockupSlice'
import editorReducer from './slices/editorSlice'

export const store = configureStore({
  reducer: { mockup: mockupReducer, editor: editorReducer }
})
