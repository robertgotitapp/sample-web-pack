const loaderUtils = require('loader-utils')
const path = require('path')

module.exports = function(content) {
    // Get options for the loader
    const options = loaderUtils.getOptions(this)
    const regex = /\.+png|jpeg|jpg/g
    const matches = content.match(regex)
    let output = content
    if (matches) {
        matches.forEach(match => {
            console.log(match)
            output = output.replace(match, processString(match))
        })
    }
    console.log(output)
    return output
}

const processString = (src) => {
    const now = new Date().toISOString()
    const index = src.lastIndexOf('.')
    const processedTimeString = now.replace(/-|:/g, '').slice(0, 15)
    const result = src + `?v=${processedTimeString}`
    return result
}

