import _ from 'lodash';

// utils
import validate from '../utils/validations';

export default function ValidateField(key, value, submittedFormBefore) {
  if (_.isNil(submittedFormBefore)) {
    console.error('submittedFormBefore is null in ValidateField');
  }
  console.log(
    `validating ${key} with ${value}; submittedFormBefore == ${submittedFormBefore}`,
    validate(key, value || null),
  );

  if (submittedFormBefore) {
    // need to return now to trigger "presence" constraint in validation
    return validate(key, value || null);
  }

  return null;
}
