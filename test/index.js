const test = require('ava')
const listen = require('test-listen')
const axios = require('axios')
const micro = require('micro')
const srv = require('../index')
const pkg = require('../package.json')
const dependencies = pkg.dependencies || {}
const devDependencies = pkg.devDependencies || {}
const dropModules = ['micro-dev', 'nsp']
const isDropped = (module) => !dropModules.includes(module)

const getUrl = fn => {
  const srv = micro(fn)
  return listen(srv)
}

test('basic check', t => {
  t.true(true, 'ava works ok')
})

if (Object.keys(devDependencies).length > 0) {
  Object.keys(devDependencies).filter(isDropped).forEach((dependency) => {
    test(`${dependency} loads ok`, t => {
      const module = require(dependency)
      t.truthy(module)
    })
  })
} else {
  test('no dependecies to test', t => {
    t.truthy(true)
  })
}

if (Object.keys(dependencies).length > 0) {
  Object.keys(dependencies).filter(isDropped).forEach((dependency) => {
    test(`${dependency} loads ok`, t => {
      const module = require(dependency)
      t.truthy(module)
    })
  })
} else {
  test('no dependecies to test', t => {
    t.truthy(true)
  })
}

test('it returns README as frontpage', async t => {
  const url = await getUrl(srv)
  const result = await axios.get(url)
  t.true(result.data.includes('MIT'), 'frontpage ok')
})
