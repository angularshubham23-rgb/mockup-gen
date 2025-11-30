const generateSpecFor = require('../lib/specGenerator')

function run() {
  const spec = generateSpecFor('Test dashboard', { theme: 'dark' })
  if (!spec || !spec.meta || !spec.spec) {
    console.log('Spec generated keys:', Object.keys(spec || {}))
  }
  console.log('Spec meta title:', spec.meta.title)
}

run()
