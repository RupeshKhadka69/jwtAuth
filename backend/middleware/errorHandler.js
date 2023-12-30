const notFound = (req, res, next) => {
  const error = new Error(` Not found -${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = req.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  if (err.name === "CastError" && err.id === "objectId") {
    statusCode = 404;
    message = "Resource not Found";
  }
  res.status(statusCode).json({
    message,
    stack:process.env.NODE_ENV === "production" ? null: err.stack
  })
};
export {notFound,errorHandler}
