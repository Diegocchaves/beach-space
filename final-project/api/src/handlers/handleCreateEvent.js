const { createEvent } = require('../logic')
const { verifyToken, handleErrorsAndRespond } = require('./helpers')
const multer = require('multer')

const upload = multer({ dest: 'uploads/' }) // Set the destination folder

module.exports = (req, res) => {
  try {
    const ownerId = verifyToken(req)

    // Assuming 'image' is the field name for the uploaded file
    upload.single('image')(req, res, (err) => {
      if (err) {
        // Handle multer error, if any
        handleErrorsAndRespond(err, res)
        return
      }

      const { body: { title, description, location, eventDate } } = req
      const image = req.file ? req.file.path : null // Use req.file.path as the image path

      createEvent(ownerId, title, description, location, eventDate, image)
        .then(eventId => res.status(201).json({ eventId }))
        .catch(error => handleErrorsAndRespond(error, res))
    })
  } catch (error) {
    handleErrorsAndRespond(error, res)
  }
}
