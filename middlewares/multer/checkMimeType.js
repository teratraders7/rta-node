import files from "../../config/files.js";



const checkMimeType = (file, cb) => {
    switch (file.fieldname) {

      case "file":
        if (files.uploads.file.supportedTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(null, false);
        }

      // Add more cases if needed for other fieldname
      default:
        cb(null, false); // Default case when fieldname doesn't match any specific case
        break;
    }
  }
  export default checkMimeType