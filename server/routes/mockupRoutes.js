const express = require('express');
const router = express.Router();
const { generateMockup } = require('../controllers/generatorController');
const asyncHandler = require('../lib/asyncHandler');
const { exportZip } = require('../controllers/exportController')

// Route: POST /api/mockup/generate

// POST /api/mockup/generate
router.post('/generate', asyncHandler(async (req, res) => {
  // Basic payload shape validation is handled inside controller
  const payload = req.body
  const result = await generateMockup(payload)
  res.json(result)
}))

// POST /api/mockup/export - returns a zip file with starter scaffolding based on the spec
router.post('/export', asyncHandler(exportZip))

module.exports = router;
