const { promisify } = require('util')
const readFileAsync = promisify(require('fs').readFile)
const md = require('markdown-it')()

module.exports = async (req, res) => {
  const readme = await readFileAsync('./README.md', 'utf-8')
  const html = md.render(readme)
  return html
}
