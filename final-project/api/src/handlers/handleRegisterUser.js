const { registerUser } = require('../logic')
const { handleErrorsAndRespond } = require('./helpers')

module.exports = (req, res) => {
  try {
    const { body: { name, email, password } } = req

    registerUser(name, email, password)
      .then(() => res.status(201).send())
      .catch(error => handleErrorsAndRespond(error, res))
  } catch (error) {
    handleErrorsAndRespond(error, res)
  }
}