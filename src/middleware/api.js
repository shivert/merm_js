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
        id
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
        id
        firstName
        lastName
        email
        authenticationToken
      }
    }
  `;

  const variables = {
    registrationDetails: {
      firstName: fields.firstName,
      lastName: fields.lastName,
      email: fields.email,
      password: fields.password
    }
  };

  return client.rawRequest(query, variables);
}

export function getMerms(authToken) {
  const endpoint = "http://localhost:3000/graphql";

  const client = new GraphQLClient(endpoint, {
    mode: "cors"
  });

  client.setHeader("Content-Type", "application/json");
  client.setHeader("Authorization", `Bearer ${authToken}`);

  const query = `
  query {
    dashboardMerms {
      suggested {
        id
        name
        lastAccessed
        owner {
          firstName
          lastName
        }
        tags {
          id
          name
        }
      }
      favorites {
        id
        name
        lastAccessed
        owner {
          firstName
          lastName
        }
        tags {
          id
          name
        }
      }
      unread {
        id
        name
        lastAccessed
        owner {
          firstName
          lastName
        }
        tags {
          id
          name
        }
      }
    }
  }`;

  return client.rawRequest(query);
}

export function getFavoriteMerms(authToken) {
  const endpoint = "http://localhost:3000/graphql";

  const client = new GraphQLClient(endpoint, {
    mode: "cors"
  });

  client.setHeader("Content-Type", "application/json");
  client.setHeader("Authorization", `Bearer ${authToken}`);

  const query = `
  query {
    favoriteMerms {
      id
      name
      lastAccessed
      owner {
        firstName
        lastName
      }
      tags {
        id
        name
      }
    }
  }
 `;

  return client.rawRequest(query);
}

export function getMerm(mermId, authToken) {
  const endpoint = "http://localhost:3000/graphql";

  const client = new GraphQLClient(endpoint, {
    mode: "cors"
  });

  client.setHeader("Content-Type", "application/json");
  client.setHeader("Authorization", `Bearer ${authToken}`);

  const query = `
  query {
    merm(id: ${mermId}) {
      id
      name
      source
      favorite
      resourceName
      resourceUrl
      description
      capturedText
      lastAccessed
      createdAt
      updatedAt
      sharedWith {
        id  
        name
      }
      owner {
        id  
        name
      }
      tags {
        id
        name
      }
      comments {
        content
        author {
          id
          name
        }
        createdAt
        updatedAt
      }
    }
  }
 `;

  return client.rawRequest(query);
}

export function favoriteMerm(mermId, favorite, authToken) {
  const endpoint = "http://localhost:3000/graphql";

  const client = new GraphQLClient(endpoint, {
    mode: "cors"
  });

  client.setHeader("Content-Type", "application/json");
  client.setHeader("Authorization", `Bearer ${authToken}`);

  const query = `
    mutation editMerm($id: ID!, $merm: EditMermInputType!) {
      editMerm(id: $id, merm: $merm) {
        id
        name
        source
        favorite
        resourceName
        resourceUrl
        description
        capturedText
        lastAccessed
        createdAt
        updatedAt
        sharedWith {
          id  
          name
        }
        owner {
          id  
          name
        }
        tags {
          id
          name
        }
      }
    }`;

  const variables = {
    id: mermId,
    merm: {
      favorite: favorite
    }
  };

  return client.rawRequest(query, variables);
}

export function addMermComment(comment, authToken) {
  const endpoint = "http://localhost:3000/graphql";

  const client = new GraphQLClient(endpoint, {
    mode: "cors"
  });

  client.setHeader("Content-Type", "application/json");
  client.setHeader("Authorization", `Bearer ${authToken}`);

  const query = `
    mutation addComment($commentDetails: CommentInputType!) {
      addComment(commentDetails: $commentDetails) {
        content
        author {
          id
          name
        }
        createdAt
        updatedAt
      }
    }`;

  const variables = {
    commentDetails: comment
  };

  return client.rawRequest(query, variables);
}
