import { GraphQLClient } from "graphql-request";

export function userLogIn(fields) {
  const endpoint = "http://localhost:3000/graphql";

  const client = new GraphQLClient(endpoint, {
    mode: "cors"
  });

  client.setHeader("Content-Type", "application/json");

  const query = `
    mutation signIn($email: String!, $password: String!) {
      signIn(email: $email, password: $password) {
        authenticationToken
        firstName
        lastName
      }
    }
  `;

  const variables = {
    email: fields.email,
    password: fields.password
  };

  return client.rawRequest(query, variables);
}

export function userCreate(fields) {
  const endpoint = "http://localhost:3000/graphql";

  const client = new GraphQLClient(endpoint, {
    mode: "cors"
  });

  client.setHeader("Content-Type", "application/json");

  const query = `
    mutation signUp($registrationDetails: UserInputType!) {
      signUp(registrationDetails: $registrationDetails) {
        firstName
        lastName
        email
        authenticationToken
      }
    }
  `;

  const variables = {
    "registrationDetails": {
      firstName: fields.firstName,
      lastName: fields.lastName,
      email: fields.email,
      password: fields.password
    }
  };

  return client.rawRequest(query, variables);
}
