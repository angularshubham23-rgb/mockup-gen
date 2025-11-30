const archiver = require('archiver')
const stream = require('stream')
const AppError = require('../errors/AppError')
const generateSpecFor = require('../lib/specGenerator')

function createProjectFilesFromSpec(spec) {
  // Minimal scaffold: package.json files & small src files for React + server.
  const project = {
    'client/package.json': JSON.stringify({
      name: 'generated-client',
      version: '0.1.0',
      private: true,
      dependencies: { react: '^18.2.0', 'react-dom': '^18.2.0' }
    }, null, 2),

    'client/src/App.jsx': `import React from 'react'\nexport default function App(){return (\n  <div style={{padding:24,fontFamily:'Inter,system-ui'}}><h1>${spec.meta.title}</h1><p>${spec.screenOverview.description}</p></div>\n)}`,

    'server/package.json': JSON.stringify({ name: 'generated-server', version: '0.1.0', dependencies: { express: '^4.18.2' } }, null, 2),
    'server/server.js': `const express = require('express');\nconst app = express();\napp.get('/', (req,res)=>res.send('Generated server running - mockup: ${spec.meta.title}'))\napp.listen(3000, ()=>console.log('generated server listening on 3000'))`,

    'README.md': `# Generated Project\nGenerated from spec: ${spec.meta.title}`
  }

  return project
}

async function exportZip(req, res) {
  console.log('[export] request body ->', Object.keys(req.body || {}).length ? JSON.stringify(req.body).slice(0, 200) : '{}')
  const { query, design, style } = req.body || {}

  // Validate
  const prompt = query || design
  if (!prompt || typeof prompt !== 'string') {
    throw new AppError('Missing query/design string to export', { status: 400, code: 'invalid_payload' })
  }

  // Generate spec
  let spec
  try { spec = generateSpecFor(prompt, style || {}) } catch (err) { throw new AppError('Spec generation failed', { status: 500, code: 'generation_failed' }) }

  // Build project files from spec
  const files = createProjectFilesFromSpec(spec)

  // Create zip stream
  res.setHeader('Content-Type', 'application/zip')
  res.setHeader('Content-Disposition', `attachment; filename="mockup-export.zip"`)

  const archive = archiver('zip', { zlib: { level: 9 } })
  archive.on('error', err => {
    console.error('[export] archive error', err && err.message)
    // If an error occurs while streaming, end the response if possible
    try { if (!res.headersSent) res.status(500).json({ error: 'generation_failed', message: 'Failed to create archive' }) } catch (e) { /* ignore */ }
    throw err
  })
  archive.pipe(res)

  // append files
  for (const [name, content] of Object.entries(files)) {
    archive.append(content, { name })
  }

  try {
    await archive.finalize()
    console.log('[export] archive finalized')
  } catch (err) {
    console.error('[export] finalize error', err && err.message)
    throw err
  }
}

module.exports = { exportZip }
