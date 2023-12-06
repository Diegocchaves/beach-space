const { updateUser } = require('../logic')
const { verifyToken, handleErrorsAndRespond } = require('./helpers')

module.exports = (req, res) => {
  try {
    const userId = verifyToken(req)

    const { body: { name, lastName, email, password } } = req

    updateUser(userId, name, lastName, email, password)
      .then(() => res.status(204).send())
      .catch(error => handleErrorsAndRespond(error, res))
  } catch (error) {
    handleErrorsAndRespond(error, res)
  }
}