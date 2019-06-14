const { PORT, DB_USER, DB_PASSWORD, DB_NAME } = require('./services/envVariables');

const server = require('./app');
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0-sud5s.mongodb.net/${DB_NAME}`, {
  useNewUrlParser: true,
  useFindAndModify: true
});
mongoose.connection
  .once('open', () => console.log('connected to databse'))
  .on('error', error => console.warn('error: ' + error));

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
