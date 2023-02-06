const express = require('express');
const authController = require('./../controllers/authController');
const bookingController = require('./../controllers/bookingController');

const Router = express.Router();

Router.post(
  '/:id',
  authController.protect,
  authController.restrictTo('user'),
  bookingController.createBooking
);

Router.get(
  '/myBookings',
  authController.protect,
  authController.restrictTo('user'),
  bookingController.getMyBooking
);

Router.get(
  '/',
  authController.protect,
  authController.restrictTo('admin'),
  bookingController.getAllBooking
);

module.exports = Router;
