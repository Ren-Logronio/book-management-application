
import createError from 'http-errors';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import multer from 'multer';
import authRouter from './routes/auth.js';
import usersRouter from './routes/users.js';
import reviewsRouter from './routes/reviews.js';
import booksRouter from './routes/books.js';
import dashboardRouter from './routes/dashboard.js';
import filesRouter from './routes/files.js';

var app = express();

var port = process.env.PORT || 3000;

app.listen(3000, function () {
  console.log('PORT - ' + port + '!');
});
// app.use("/", (req, res) => { res.send("Index - Book Management System") });

mongoose.connect(
  'mongodb://localhost:27017/book-management-db').then(() => {
    console.log("MONGODB CONNECTED");
  }).catch(err => {
    console.log("MONGODB CONNECTION FAILED");
    console.log(err);
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/books', booksRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/files', filesRouter);
app.use('/test/', (req, res) => {res.status(200).send('test');})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message || "unexplained error");
});

export default app;