const axios = require('axios')

async function smoke() {
  try {
    const res = await axios.post('http://localhost:4000/api/mockup/generate', { query: 'Tiny landing page mockup' })
    console.log('status', res.status)
    console.log('ok?', res.data && res.data.ok)
    console.log('spec keys:', Object.keys(res.data.spec || {}))
  } catch (err) {
    console.error('smoke test failed ->', err.message)
    process.exit(1)
  }
}

smoke()
