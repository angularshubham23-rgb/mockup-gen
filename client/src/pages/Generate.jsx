import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { generateSpec } from '../store/slices/mockupSlice'

export default function Generate(){
  const [query, setQuery] = useState('Dashboard mockup dark mode')
  const dispatch = useDispatch()
  const { spec, loading, error, errorInfo } = useSelector(s => s.mockup)

  const handleGenerate = () => {
    dispatch(generateSpec({ query }))
  }

  const handleExport = async () => {
    try {
      const resp = await fetch('/api/mockup/export', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query }),
      })
      if (!resp.ok) throw new Error(`Export failed: ${resp.statusText || resp.status}`)
      const data = await resp.arrayBuffer()
      const blob = new Blob([data], { type: 'application/zip' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'mockup-export.zip'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Export error', err)
      alert('Export failed: ' + (err.message || err))
    }
  }

  return (
    <div className="page generate">
      <div className="controls">
        <textarea value={query} onChange={e => setQuery(e.target.value)} rows={4} />
        <button onClick={handleGenerate} disabled={loading}>{loading ? 'Generating...' : 'Generate'}</button>
      </div>

      <div className="preview">
        {error && (
          <div className="error">
            <div><strong>Error:</strong> {error}</div>
            {errorInfo && errorInfo.details && (
              <pre style={{marginTop:8,whiteSpace:'pre-wrap'}}>{JSON.stringify(errorInfo.details, null, 2)}</pre>
            )}
          </div>
        )}
        {spec ? (
          <pre className="spec-output">{JSON.stringify(spec, null, 2)}</pre>
        ) : (
          <div className="placeholder">Results will appear here</div>
        )}
        <div style={{marginTop:8}}>
          <button onClick={handleExport} disabled={!spec}>Export ZIP</button>
        </div>
      </div>
    </div>
  )
}
