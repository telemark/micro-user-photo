const fs = require('fs')
const resolve = require('path').resolve
const students = require('./step2.json')
const bfj = require('bfj')

const res = students.map(student => {
  const path = resolve(`./images/${student.unitId}/${student.filename}.png`)
  if (fs.existsSync(path)) {
    return {
      username: student.username,
      file: fs.readFileSync(path, 'base64')
    }
  } else {
    return false
  }
})

const data = res.filter(student => !!student)
const wstream = fs.createWriteStream('./step3.json')

const stream = bfj.streamify(data)

stream.on('data', chunk => wstream.write(chunk))
stream.on('end', () => wstream.end())
