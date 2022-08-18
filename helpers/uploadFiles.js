const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFile = async (
    files,
    extensionAllowed = ["jpg", "png", "jpeg", "gif"],
    asset = ""
  ) => {
  return new Promise((res, rej) => {
    const { archivo } = files || {};

    if(!archivo) {
      return rej("No files were uploaded." )
    }

    const slicedName = archivo.name.split(".");
    const extension = slicedName[slicedName.length - 1];

    if (!extensionAllowed.includes(extension)) {
      return rej(
        `La extension ${extension} no es permitida, ${extensionAllowed} `
      );
    }

    const tempName = uuidv4() + "." + extension;
    const uploadPath = path?.join(__dirname, "../uploads/", asset, tempName);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        rej(err);
      }

      return res(tempName);
    });
  });
};

module.exports = { uploadFile };
