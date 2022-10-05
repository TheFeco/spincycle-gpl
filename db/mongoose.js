const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true }).then((data) =>  {
  console.log(data);
  console.log('Conectado al server');
});

module.exports = { mongoose };
