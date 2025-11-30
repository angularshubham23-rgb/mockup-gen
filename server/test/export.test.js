const axios = require('axios')
const fs = require('fs')

async function run() {
  try {
    const url = 'http://localhost:4000/api/mockup/export'
    // Ask for a zip and save it
    const res = await axios.post(url, { query: 'Minimal export test' }, { responseType: 'arraybuffer', validateStatus: () => true })
    if (res.status !== 200) { console.error('Expected 200, got', res.status); process.exit(2) }
    if (!res.headers['content-type'] || !res.headers['content-type'].includes('zip')) { console.error('Expected zip content type'); process.exit(3) }
    fs.writeFileSync('tmp-test-export.zip', Buffer.from(res.data))
    console.log('Export test saved: tmp-test-export.zip')
  } catch (err) {
    console.error('export test failed ->', err.message)
    process.exit(1)
  }
}

run()
