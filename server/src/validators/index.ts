import * as yup from 'yup';
import User from '@models/User';

function userValidate(user: User) {
  return yup.object().shape({
    name: yup.string().required(),
    homeTeam: yup.string().required(),
    age: yup.date().required(),
    height: yup.string().required(),
  }).validate(user, { abortEarly: false });
}

export { userValidate };