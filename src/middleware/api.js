import { GraphQLClient } from "graphql-request";

export function userLogIn(fields) {
  console.log("We made it");
  console.log(fields);

  const endpoint = "http://localhost:3000/graphql";

  const client = new GraphQLClient(endpoint, {
    mode: "cors"
  });

  client.setHeader("Content-Type", "application/json");

  const query = `
    mutation signIn($email: String!, $password: String!) {
      signIn(email: $email, password: $password) {
        authenticationToken
        first_name
        last_name
      }
    }
  `;

  const variables = {
    email: fields.username.value,
    password: fields.password.value
  };

  return client.rawRequest(query, variables);
}
