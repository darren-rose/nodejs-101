var http = require('http')
var url = require('url')
const { createLogger, transports ,format} = require('winston')

var dt = require('./module')

const logger = createLogger({
  format: format.combine(
      format.timestamp(),
      format.json()
  ),
  transports: [
      new transports.Console(),
      new transports.File({filename: 'logs/app.log', level:'info'})
  ]
})

const port = process.env.PORT || 8000

logger.info('Starting server on port: ' + port)

http.createServer(function (req, res) {
    logger.info('handling request path: ' + req.url)

    res.setHeader('X-My-Header', 'yoyo')
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    var q = url.parse(req.url, true).query
    res.write('{"name": "' + q.name + '" }')
    res.end()
}).listen(port)
