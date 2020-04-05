/*
 * @Author: ly525
 * @Date: 2019-12-22 16:15:22
 * @LastEditors  : ly525
 * @LastEditTime : 2019-12-22 17:23:30
 * @FilePath: /offline-issues/src/writemarkdown.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 */
var fs = require('fs')
var path = require('path')

var handlebars = require('handlebars')
var mkdirp = require('mkdirp')

String.prototype.replaceAll = function (reallyDo, replaceWith, ignoreCase) {
  if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
    return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
  } else {
    return this.replace(reallyDo, replaceWith);
  }
}

module.exports = function writemarkdown(options, cb) {
  if (options.destination) {
    var dest = path.resolve(options.destination)
  } else {
    var dest = 'md'
  }
  var markdownTemplate = 'markdown'
  if (options.template) {
    markdownTemplate = options.template
  }
  var templateFile = markdownTemplate + ".hbs"

  mkdirp(dest, function (err) {
    if (err) return cb(err, 'Error creating md directory.')
  })

  var issues = fs.readFileSync('comments.json')
  issues = JSON.parse(issues)
  issues.forEach(function (issue) {
    console.log(issue)
    // var filename = repoDetails(issue.url)
    var filename = issue.title
    var source = fs.readFileSync(path.join(__dirname, '/templates/', templateFile))
    var template = handlebars.compile(source.toString())
    var result = template(issue)
    // console.log(result)
    // TODO：处理特殊字符
    result = result.replaceAll("&#x60;", "`")
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">")
      .replaceAll("&#x3D;", "=")
      .replaceAll("&quot;", "\"")
      .replaceAll("&#x27;", "'")
      .replaceAll("'", "\'")
      .replaceAll("&amp;", "&")

    fs.writeFile(dest + '/' + filename + '.md', result, function (err) {
      if (err) return cb(err, 'Error writing md file.')
    })

  })
  cb(null, 'Wrote markdown files.')
}

function repoDetails(issue) {
  var a = issue.split('/')
  var filename = a[3] + '-' + a[4] + '-' + a[6]
  return filename
}
