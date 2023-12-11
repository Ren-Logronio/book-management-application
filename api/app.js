
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import authRouter from './routes/auth.js';
import usersRouter from './routes/users.js';
import reviewsRouter from './routes/reviews.js';
import booksRouter from './routes/books.js';
import mongoose from 'mongoose';

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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message || "unexplained error");
});

export default app;