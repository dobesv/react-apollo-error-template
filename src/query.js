import gql from "graphql-tag";

export default gql`
  query ErrorTemplate {
    people {
      id
      name
    }
  }
`;
