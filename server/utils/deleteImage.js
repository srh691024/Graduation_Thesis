const cloudinary = require('cloudinary').v2;


const deleteImage = async (filesnames) => {
    for (let i = 0; i < filesnames.length; i++) {
        await cloudinary.uploader.destroy(filesnames[i])
    }
}
module.exports = deleteImage
