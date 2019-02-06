import { GraphQLClient } from "graphql-request";

const endpoint = "http://localhost:3000/graphql";
const client = new GraphQLClient(endpoint, {
  mode: "cors",
  headers: {
    "Content-Type": "application/json"
  }
});

export const tokenSelector = state => state.userObject.token;

export const setAuthHeader = token => {
  authClient.setHeader("Authorization", `Bearer ${token}`);
};

const authClient = new GraphQLClient(endpoint, {
  mode: "cors",
  headers: {
    "Content-Type": "application/json"
  }
});

export function userLogIn(fields) {
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

export function getMerms() {
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

  return authClient.rawRequest(query);
}

export function getMerm(mermId) {
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

  return authClient.rawRequest(query);
}

export function favoriteMerm(mermId, favorite) {
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
    }`;

  const variables = {
    id: mermId,
    merm: {
      favorite: favorite
    }
  };

  return authClient.rawRequest(query, variables);
}

export function addMermComment(comment) {
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

  return authClient.rawRequest(query, variables);
}

export function searchMerms(queryString) {
  const query = `
    query {
      searchMerm(queryString: "${queryString}") {
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
    }`;

  return authClient.rawRequest(query);
}
