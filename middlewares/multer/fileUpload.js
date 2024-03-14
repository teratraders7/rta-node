import multer from "multer";
import path from "path";
import checkMimeType from "./checkMimeType.js";
import formatFileName from "./getFileName.js";
import createDirectoryIfNotExists from "./createDirectory.js";
import files from "../../config/files.js";


const storeFile = multer.diskStorage({

    destination : (req, file, cb) => {
        const pathDirectory = `${files.uploads.root_directory}/${files.uploads.file.savedDirectory}`
        
        createDirectoryIfNotExists(pathDirectory)
        cb(null, pathDirectory)
    },
    filename : (req, file, cb) => {
        const filename = formatFileName(file.originalname)
        cb(
            null,
            filename
         )
    },
    
})
export const uploadFile = multer({
    storage : storeFile,
    limits : {
        fileSize : 1024 * 1024 * 10
    },
    fileFilter : (req, file, cb) => {
        checkMimeType(file,cb)
    }
})
