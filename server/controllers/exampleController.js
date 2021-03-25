const exampleController = {};

exampleController.getExample = (req, res, next) => {
  next();
}

module.exports = exampleController;