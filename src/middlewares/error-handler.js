/**
 * -------------------------------------------------------------------------
 * GLOBAL ERROR HANDLER MIDDLEWARE
 * -------------------------------------------------------------------------
 * Captura todos los errores enviados con next(error)
 * y responde con un formato estándar.
 * -------------------------------------------------------------------------
 */

const errorHandler = (error, req, res, next) => {

  console.log("ENTRÓ AL ERROR HANDLER:", error.name);

  if (error?.name === "CastError") {
    return res.status(404).json({
      success: false,
      message: "Product NOT found"
    });
  }


  const status = error.status || 500;
  res.status(status).json({
    success: false,
    message: error.message || "Internal Server Error"
  });
};

export default errorHandler;