import React, { Suspense, lazy } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Generate from './pages/Generate'
const EditorPage = lazy(() => import('./pages/Editor'))

export default function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <div className="brand">Mockup Generator</div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/generate">Generate</Link>
          <Link to="/editor">Editor</Link>
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/generate" element={<Generate/>} />
          <Route path="/editor" element={ <Suspense fallback={<>Loading…</>}><EditorPage /></Suspense>} />
        </Routes>
      </main>
      <footer className="app-footer">© Mockup Gen</footer>
    </div>
  )
}

// Lazy-load Editor page to keep initial bundle small
import React from 'react'
const EditorPage = React.lazy(() => import('./pages/Editor'))
