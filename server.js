require('dotenv').config();
const mongoose = require('mongoose');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! ⚡ Shuttung down....');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('DB connection successful');
  });

const server = app.listen(3000, () => {
  console.log('listening on port 3000.....');
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! ⚡ Shuttung down....');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
