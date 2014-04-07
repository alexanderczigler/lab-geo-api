var _connection;

exports.connect = function(req, res, next) {
  try {
    var config = require('../app.config.json');
    var mysql = require('mysql');
    _connection = mysql.createConnection({
      host: config.db.host,
      user: config.db.username,
      password: config.db.password,
      port: config.db.port
    });
    next();
  } catch(e) {
    console.log('mysql error', e);
    next(e);
  }
};

exports.disconnect = function() {
  try {
    _connection.end();
  }
  catch (e) {
    console.log('Error when attempting to close connection.', e);
  }
}



/*
 * Find
 */
exports.find = function (req, res, next) {

  res.setHeader('Content-Type', 'application/json');

  try {

    var q = req.params.q;
    var getQuery = 'SELECT * FROM `maxmind`.`locations` WHERE `city` LIKE \'\%' + q + '\%\'';

    _connection.query(getQuery, function (err, rows, fields) {
      if (err)
        throw err;

      res.send(rows);
    });
  }
  catch (e) {
    res.end("error");
  }
  finally {
    next();
  }
};
