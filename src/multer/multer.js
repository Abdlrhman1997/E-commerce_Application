import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../middleware/ErrorHandling.js";

function myMulter(folderName) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${folderName}`);
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() + "-" + file.originalname);
    },
  });

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("images only"), false);
    }
  }

  const upload = multer({ storage, fileFilter });
  return upload;
}

export const uploadSingleFile = (fileName, folderName) =>
  myMulter(folderName).single(fileName);

export const uploadMixedFiles = (arrayOfFields, folderName) =>
  myMulter(folderName).fields(arrayOfFields);
