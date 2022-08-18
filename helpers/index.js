const dbValidators = require('./db-validators')
const { uploadFile }  = require("./uploadFiles");
const generateJWT      = require("./generate-jwt");
const { googleVerify } = require("./google-verify");

module.exports = {
  uploadFile,
  ...generateJWT,
  ...googleVerify,
  ...dbValidators
}