// This middleware runs when no route matches the request (404 Not Found).
const notFound = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  res.status(404);
  next(error); // pass the error to the next error handler
};

// This is our centralized error handler.
// Any error thrown in controllers will end up here (via next(error) or try/catch).
const errorHandler = (err, req, res, next) => {
  // If status code is still 200, change it to 500 (server error)
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Something went wrong on the server";

  // Handle common Mongoose errors nicely
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }
  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate value entered (already exists)";
  }

  res.status(statusCode).json({
    message,
    // Only show stack trace in development mode, not in production
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
