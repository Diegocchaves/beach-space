const { retrieveTargetedEvent } = require('../logic')
const { verifyToken, handleErrorsAndRespond } = require('./helpers')

module.exports = (req, res) => {
  try {
    const userId = verifyToken(req)

    retrieveTargetedEvent(userId)
      .then(events => res.status(200).json(events))
      .catch(error => handleErrorsAndRespond(error, res))
  } catch (error) {
    handleErrorsAndRespond(error, res)
  }
}