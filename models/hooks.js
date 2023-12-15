export const handleSaveError = (error, data, next) => {
  const { code, name } = error;
  error.status = code === 11000 && name === "MongoServerError" ? 409 : 400;
  next();
};
export const addUpdateSettings = function (next) {
  this.option.new = true;
  this.option.runValidators = true;
  next();
};
