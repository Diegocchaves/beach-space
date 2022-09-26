const { deleteEvent } = require('../logic')
const { verifyToken, handleErrorsAndRespond } = require('./helpers')

module.exports = (req, res) => {
  try {
    const userId = verifyToken(req)

    const { params: { eventId } } = req

    deleteEvent(userId, eventId)
      .then(() => res.status(204).send())
      .catch(error => handleErrorsAndRespond(error, res))
  } catch (error) {
    handleErrorsAndRespond(error, res)
  }
}