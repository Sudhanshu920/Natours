const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Tour = require('../models/tourModels');
const Booking = require('../models/bookingModels');

exports.createBooking = catchAsync(async (req, res, next) => {
  const currTour = await Tour.findById(req.params.id);
  const currUser = req.user;
  const currPrice = currTour.price;

  if (!currTour) {
    return next(new AppError('invalid tour id', 404));
  }

  const doc = await Booking.create({
    tour: currTour,
    user: currUser,
    price: currPrice
  });

  res.status(200).json({
    status: 'success',
    message: 'tour booked',
    data: doc
  });
});

exports.getMyBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.find({ user: { $eq: req.user._id } });
  if (!booking) {
    res.status(204).json({
      message: 'no bookings'
    });
  }
  res.status(200).json({
    status: 'success',
    data: booking
  });
});

exports.getAllBooking = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find();
  res.status(200).json({
    status: 'success',
    result: bookings.length,
    data: bookings
  });
});
