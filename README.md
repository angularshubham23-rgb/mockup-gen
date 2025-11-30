# Mockup Generator Tool

This project contains a mockup generation tool with a Node.js backend and a React + Redux frontend.

Project layout:

```
mockup-gen/
  server/   - Express API that generates mockup specs
  client/   - React + Redux app to request generation and preview specs
```

Quick start (Windows PowerShell):

1. Start the server
   cd server; npm install; npm run dev

2. Start the client
   cd client; npm install; npm run dev

3. Open http://localhost:5173/generate and use the textarea to generate a mockup.

Convenience helper:

PowerShell - run both dev servers in separate windows:

```powershell
.\run-dev.ps1
```

Server tests / smoke-check:

```powershell
cd server; npm install; npm test

New features:
- Export ZIP: On the Generate screen you can now export a ZIP file with a basic React + Express starter generated from the mockup spec (calls POST /api/mockup/export).
- Editor: There's a new Editor page (/editor) with a WYSIWYG canvas that supports drag & drop components, inspector, and live preview panels.

CI & tests:
- A GitHub Actions workflow is included at `.github/workflows/ci.yml` to run server and client tests on push/pull requests.

Error handling
- Server returns structured JSON errors in the shape { error: '<code>', message: '<human message>', details?: any } with appropriate HTTP status codes (400 for client validation issues, 500 for server errors).

Client behavior
- The client thunk will surface the server's structured error messages to the UI so the Generate page shows the human message and optional details.

Uploading to GitHub
-------------------
I’ve added a helper script `upload-to-github.ps1` to automate creating a GitHub repo if you have the GitHub CLI (`gh`) installed, or to show exact manual commands if `gh` is not available.

To run the script locally (PowerShell):

```powershell
.\upload-to-github.ps1 -repoName "mockup-gen" -visibility public
```

If you prefer, you can create a repository via GitHub.com and push the local repo with these commands:

```powershell
git remote add origin <your-remote-url>
git branch -M main
git push -u origin main
```
```
