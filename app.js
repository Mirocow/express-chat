
var fs          = require('fs')
  , debug       = require('debug')('express-chat')
  //, configFile  = process.argv.slice(2)[0] || './config.json'
  //, userconfig  = JSON.parse(fs.readFileSync(configFile, 'utf8'))
  , autoload    = require('express-autoload');

debug('Starting application...');

var model   = {}
  , app     = {}
  , config  = require('./config')()
  //, config  = require('./config')(userconfig)
  , next = function(err) {

  if(err) {
    console.log(err.stack || err);
    return;
  }

  app.server.listen(config.port, config.hostname, function() {
    console.log('Server started on port %s in %s mode',
      app.server.address().port,
      app.express.settings.env);
  });

};

autoload(app, model, config, next);

