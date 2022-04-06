let fs = require('fs')

module.exports.getAllB = function(db)
{
    return JSON.parse(fs.readFileSync(db))
}

module.exports.setAllB = function(db,updateAllBook)
{
   fs.writeFileSync(dbUrl,JSON.stringify(updateAllBook))
}