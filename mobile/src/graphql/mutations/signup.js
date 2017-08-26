import { gql } from 'react-apollo';

export default gql`
  mutation signup(
    $email: String!
    $password: String!
    $fullName: String!
    $username: String!
    $avatar: String
  ) {
    signup(
      fullName: $fullName
      email: $email
      password: $password
      username: $username
      avatar: $avatar
    ) {
      token
    }
  }
`;
