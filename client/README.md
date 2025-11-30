# Client (React + Redux) - mockup-gen/client

This folder contains the React + Redux frontend built with Vite.

Quick start (PowerShell):

```powershell
cd client
npm install
npm run dev
```

Dev server runs on port 5173 and proxies /api/* to http://localhost:4000 by default.

Error handling
- If the server returns a structured error the client surfaces it and displays the message + optional details in the Generate page. This helps users diagnose validation problems or server-side failures.

Editor
- Browse to /editor to try the WYSIWYG canvas. Drag components from the left sidebar to the canvas and select them to edit properties in the inspector.

Exporting
- Use the Generate screen to create a specification and click "Export ZIP" to download a basic React + Express scaffold generated from the spec.
