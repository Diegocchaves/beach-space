const { updateEvent } = require('../logic')
const { verifyToken, handleErrorsAndRespond } = require('./helpers')

module.exports = (req, res) => {
  try {
    const userId = verifyToken(req)

    const { params: { eventId }, body: { title, description, location, eventDate } } = req

    updateEvent(userId, eventId, title, description, location, eventDate)
      .then(() => res.status(204).send())
      .catch(error => handleErrorsAndRespond(error, res))
  } catch (error) {
    handleErrorsAndRespond(error, res)
  }
}