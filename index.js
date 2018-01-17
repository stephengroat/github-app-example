var crypto = require('crypto')

var createHandler = require('github-webhook-handler');

var handler = createHandler({
  path: '',
  secret: 'eg4ZWoPdfRXrKNLtHuR7'
});

exports.createServer = function createServer(req, res) {
  console.log('calcsha1=', crypto.createHmac('sha1', options.secret).update(req.body.toString()).digest('hex'))
  handler(req, res, function (err) {
    console.error('Error:', err)
    res.statusCode = 404
    res.end('no such location')
  });
};

var createApp = require('github-app');

var app = createApp({
  id: '8172',
  cert: '123'
});

handler.on('error', function (err) {
  console.error('Error:', err.message)
});

handler.on('issues', function (event) {
  console.log("EVENT", event);
  if (event.payload.action === 'opened') {
    var installation = event.payload.installation.id;
    app.asInstallation(installation).then(function (github) {
      github.issues.createComment({
        owner: event.payload.repository.owner.login,
        repo: event.payload.repository.name,
        number: event.payload.issue.number,
        body: 'Welcome to the robot uprising.'
      });
    });
  }
});
