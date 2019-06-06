const loaderUtils = require('loader-utils')
const path = require('path')
// const validateOptions = require('schema-utils')
// const schema = require('./options.json')



module.exports = function(content) {
    const options = loaderUtils.getOptions(this) || {}

    // validateOptions(schema, options, 'File Loader');

    const context = options.context || this.rootContext 

    const url = loaderUtils.interpolateName(this, options.name, {
        context, 
        content,
        regExp: options.regExp
    })
    
    let outputPath = processString(url)

    if (options.outputPath) {
        if (typeof options.outputPath === 'function') {
          outputPath = options.outputPath(url, this.resourcePath, context);
        } else {
          outputPath = path.posix.join(options.outputPath, url);
        }
      }

    let publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;

    if (options.publicPath) {

        if (typeof options.publicPath === 'function') {
        publicPath = options.publicPath(url, this.resourcePath, context);
        } else {
        publicPath = `${
            options.publicPath.endsWith('/')
            ? options.publicPath
            : `${options.publicPath}/`
        }${url}`;
        }

        publicPath = JSON.stringify(publicPath)
    }

    if (typeof options.emitFile === 'undefined' || options.emitFile) {
        this.emitFile(outputPath, content);
    }

    // TODO revert to ES2015 Module export, when new CSS Pipeline is in place
    return `module.exports = ${publicPath};`;
}

const processString = (url) => {
    const now = new Date().toISOString()
    const index = url.lastIndexOf('.')
    const timeString = now.slice(0, 10) + now.slice(11, 19)
    const processedTimeString = timeString.replace
    const result = url.slice(0, index) + '.v=' + timeString + url.slice(index)
    return result
}

