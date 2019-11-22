var https = require('https')
async function convertImgToBase64 (imgUrl, callback) {
  const result =  new Promise((async function(resolve, reject) {
    await https.get(imgUrl, function(res) {
      var chunks = []
      var size = 0
      res.on('data', (chunk) => {
        chunks.push(chunk)
        size += chunk.length
      })
      res.on('end', () => {
        var data = Buffer.concat(chunks, size)
        var base64IMG = data.toString('base64')
        resolve(base64IMG)
      })
    })
  }))
  console.log(result)
  return result
}
module.exports = {
  convertImgToBase64
}