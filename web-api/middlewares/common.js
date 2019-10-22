
logger  = (req, res, next) => {
    console.log(`Logged ${req.url} ${req.method} ---- ${new Date()}`);
    next();
};

wrongRoute = (req, res, next) => {
    var error = new Error("Not found Please try with another route");
    error.status = 404;
    next(error);
};


errorHandler = (err, req, res, next) => {
    var errObj = {
        status: err.status,
        error: {
            message: err.message
        }
    }
    res.status(err.status).json(errObj)
}


module.exports = {logger , wrongRoute , errorHandler}