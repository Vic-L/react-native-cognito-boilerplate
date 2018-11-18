const PASSWORD_MIN_LENGTH = 6

import validation from 'validate.js'

const constraints = {
  // login form
  'login-email': {
    presence: {
      message: '^Please enter an email address'
    },
    email: {
      message: '^Please enter a valid email address'
    }
  },
  'login-password': {
    presence: {
      message: '^Please enter a password'
    },
    length: {
      minimum: PASSWORD_MIN_LENGTH,
      message: `^Please enter at least ${PASSWORD_MIN_LENGTH} characters`
    }
  },
}

function validate(fieldName, value) {
  var formValues = {}
  formValues[fieldName] = value

  var formFields = {}
  formFields[fieldName] = constraints[fieldName]

  const result = validation(formValues, formFields)

  if (result) {
    return result[fieldName][0]
  }
  return null
}

export { PASSWORD_MIN_LENGTH }

export default validate