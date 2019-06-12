const { PORT, DB_USER, DB_PASSWORD, DB_NAME } = require('./services/envVariables');

const app = require('./app');
const http = require('http');
const mongoose = require('mongoose');

const server = http.createServer(app);
const io = require('socket.io')(server);

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0-sud5s.mongodb.net/${DB_NAME}`, {
  useNewUrlParser: true,
  useFindAndModify: true
});
mongoose.connection
  .once('open', () => console.log('connected to databse'))
  .on('error', error => console.warn('error: ' + error));

app.use((req, res, next) => {
  req.io = io;

  next();
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
