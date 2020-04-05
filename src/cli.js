
// var ghauth = require('ghauth')
var getIssues = require('./index.js')

var options = require('yargs')
  .usage('Usage: $0 [options] [repository ...]')
  .option('destination', {
    alias: 'd',
    describe: 'Change destination of the generated files'
  })
  .option('html', {
    alias: 'h',
    describe: 'If no repository given, generate HTML from existing offline cache',
    boolean: true
  })
  .option('no-static', {
    alias: 'S',
    describe: "Don't generate static files for HTML format",
    boolean: true
  })
  .option('state', {
    alias: 's',
    describe: 'Filter by issue state',
    choices: ['open', 'closed', 'all'],
    default: 'open'
  })
  .option('username', {
    alias: 'u',
    describe: 'Github username',
  })
  .option('password', {
    alias: 'p',
    describe: 'Github access token',
  })
  .option('template', {
    alias: 't',
    describe: 'template name',
  })
  .option('type', {
    alias: 'c',
    describe: 'output type',
    choices: ['markdown', 'html', 'all'],
    default: 'markdown'
  })
  .help('help')
  .argv

var ghAuthOptions = {
  configName: 'offline-issues', // ~/.config/[configName].json will store the token
  scopes: [ 'repo' ], // (optional) whatever GitHub auth scopes you require
  note: 'This token is for the offline-issues module from NPM' // (optional) saved with the token on GitHub
}

var token = {
  user: options.username || 'ly525',
  // token: options.password
  token: '173b3dec34a069ccdf62f073425d0bca553baa23'
}

getIssues(token, options, function (err, message) {
  if (err) console.log(err, message)
  console.log(message)
})
