const { registerUser } = require('../logic')
const { handleErrorsAndRespond } = require('./helpers')

module.exports = (req, res) => {
  try {
    const { body: { name, lastName, email, password } } = req

    registerUser(name, lastName, email, password)
      .then(() => res.status(201).send())
      .catch(error => handleErrorsAndRespond(error, res))
  } catch (error) {
    handleErrorsAndRespond(error, res)
  }
}