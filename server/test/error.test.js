const axios = require('axios')

async function run() {
  try {
    // Post empty body -> expect 400
    const res = await axios.post('http://localhost:4000/api/mockup/generate', {}, { validateStatus: () => true })
    console.log('status', res.status)
    console.log('body', res.data)
    if (res.status !== 400) {
      console.error('Expected 400 status for invalid payload')
      process.exit(2)
    }
    if (!res.data || res.data.error !== 'invalid_payload') {
      console.error('Expected error code invalid_payload', res.data)
      process.exit(3)
    }
    console.log('error handling test passed')
  } catch (err) {
    console.error('error test failed ->', err.message)
    process.exit(1)
  }
}

run()
