import User from '../../models/User';

export default {
  signup: (_, { fullName, ...rest }) => {
    const [firstName, ...lastName] = fullName.split(' ');
    return User.create({ firstName, lastName, ...rest });
  }
}
