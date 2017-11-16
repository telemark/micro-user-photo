const sql = require('mssql')
const fs = require('fs')
const elevInfo = require('./step0.json')

async function getUsername (id) {
  console.log(`Getting username for ${id}`)
  try {
    const res = await sql.query`SELECT top 1 Username as username FROM dbMetakatalog.dbo.tblObjects where SSN = ${id}`
    return res.recordset[0].username
  } catch (e) {
    console.log(e)
    return false
  }
}

(async function () {
  await sql.connect('mssql://username:password@hostname/dbMetakatalog')
  const res = await Promise.all(elevInfo.map(async elev => {
    const username = await getUsername(elev.id)
    return username ? { unitId: elev.unitId, filename: elev.filename, username: username } : false
  }))
  console.log('Done')
  const filterRes = res.filter(r => !!r)
  fs.writeFileSync('./step1.json', JSON.stringify(filterRes, null, 2))
  process.exit(0)
})()
