# Server (Express) - mockup-gen/server

This folder contains the Express backend API for the Mockup Generator.

Endpoints:
- GET /api/health — basic health check
- POST /api/mockup/generate — generate a mockup specification and scaffolding manifest

- POST /api/mockup/export — generates a ZIP of a minimal React + Express scaffold based on a prompt or design payload. Responds with a streamed ZIP.

Error format & status codes:
- 400 Bad Request — payload validation errors
	Response shape: { error: 'invalid_payload', message: 'human friendly message', details?: any }
- 500 Internal Server Error — generation or unexpected failures
	Response shape: { error: 'internal_error' | 'generation_failed', message: 'An internal error occurred', details?: any }

Quick start (PowerShell):

```powershell
cd server
npm install
npm run dev
```

Server will listen on port 4000 by default.

Running tests:

1) Start the server: `npm run dev` (keep it running)  
2) In another shell run: `npm test` (this will run smoke and error tests that hit the running server)

Export example (curl):

```bash
curl -X POST http://localhost:4000/api/mockup/export -H 'Content-Type: application/json' -d '{"query":"Simple landing"}' --output generated.zip
```
