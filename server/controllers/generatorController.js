const generateSpecFor = require('../lib/specGenerator');
const AppError = require('../errors/AppError')

async function generateMockup(payload) {
  // Minimal validation
  if (!payload || typeof payload !== 'object') {
    throw new AppError('Missing payload body or invalid JSON', { status: 400, code: 'invalid_payload' })
  }

  // Accept a `query` or `design` payload. We'll produce a spec + scaffolding manifest
  const prompt = payload.query || payload.design
  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    throw new AppError('Request must include a non-empty `query` or `design` field', { status: 400, code: 'invalid_payload' })
  }
  const style = payload.style || { theme: 'light' };

  let spec
  try {
    spec = generateSpecFor(prompt, style);
  } catch (err) {
    // wrap generator crashes into AppError
    throw new AppError('Spec generation failed', { status: 500, code: 'generation_failed', details: String(err && err.message) })
  }

  // return spec + a small scaffolding manifest for client to consume
  return {
    ok: true,
    spec,
    scaffolding: {
      server: { entry: 'server/server.js', framework: 'express' },
      client: { framework: 'react', state: 'redux', entry: 'src/index.js' },
      instructions: 'Run server using `npm start` in server and `npm run dev` in client',
    },
  };
}

module.exports = { generateMockup };
