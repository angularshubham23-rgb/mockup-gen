import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const generateSpec = createAsyncThunk('mockup/generate', async (payload, thunkAPI) => {
  try {
    const res = await axios.post('/api/mockup/generate', payload)
    return res.data
  } catch (err) {
    // If server provided a structured error payload, return it as rejected value
    if (err.response && err.response.data) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
    return thunkAPI.rejectWithValue({ error: 'network_error', message: err.message || 'Network error' })
  }
})

const mockupSlice = createSlice({
  name: 'mockup',
  initialState: { loading: false, spec: null, error: null, errorInfo: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateSpec.pending, (state) => { state.loading = true; state.error = null })
      .addCase(generateSpec.fulfilled, (state, action) => { state.loading = false; state.spec = action.payload.spec })
      .addCase(generateSpec.rejected, (state, action) => {
        state.loading = false
        // Prefer structured server side message (action.payload) otherwise action.error.message
        state.error = (action.payload && action.payload.message) || action.error.message || 'Unknown error'
        state.errorInfo = action.payload || null
      })
  }
})

export default mockupSlice.reducer
