import { GraphQLClient } from "graphql-request";

const endpoint = `http://${location.hostname}:3000/graphql`;

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

export function createMerm(fields) {
  const query = `
    mutation createMerm ($mermDetails: MermInputType!) {
      createMerm(mermDetails: $mermDetails) {
        id
      }
    }
  `;

  const mermDetails = {
    ...fields,
    source: "merm.io"
  };

  const variables = { mermDetails };

  return authClient.rawRequest(query, variables);
}

export function getMerm(mermId, shared) {
  const query = `
  query {
    merm(id: ${mermId}, shared: ${shared}) {
      id
      name
      source
      favorite
      resourceName
      resourceUrl
      description
      capturedText
      contentType
      lastAccessed
      createdAt
      updatedAt
      expiryDate
      sharedWith {
        id  
        name
      }
      category {
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
      history {
        title
        url
        visitTime
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
    mutation favoriteMerm($id: ID!, $merm: FavoriteMermInputType!) {
      favoriteMerm(id: $id, merm: $merm) {
        id
        favorite
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

export function removeTag(tagId) {
  const query = `
  mutation deleteTag($id: ID!) {
    deleteTag(id: $id) {
      id
      name
    }
  }`;
  const variables = {
    id: tagId
  };
  return authClient.rawRequest(query, variables);
}

export function deleteMerm(mermId) {
  const query = `
  mutation deleteMerm($id: ID!) {
    deleteMerm(id: $id) {
      id
      name
    }
  }`;
  const variables = {
    id: mermId
  };
  return authClient.rawRequest(query, variables);
}

export function addTag(tag) {
  const query = `
   mutation addTag($tagDetails: TagInputType!) {
      addTag(tagDetails: $tagDetails) {
        id
        name
      }
    }`;
  const variables = {
    tagDetails: tag
  };
  return authClient.rawRequest(query, variables);
}

export function editMerm(mermId, fields) {
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
        contentType
        lastAccessed
        createdAt
        updatedAt
        expiryDate
        comments {
          content
          author {
            id
            name
          }
          createdAt
          updatedAt
        }
        sharedWith {
          id  
          name
        }
        category {
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
        history {
          title
          url
          visitTime
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
    merm: fields
  };

  return authClient.rawRequest(query, variables);
}

export function getCategories() {
  const query = `
  query {
    categories {
      id
      name
      rank
      custom
    }
  }`;

  return authClient.rawRequest(query);
}

export function updateCategories(categories) {
  categories.map(category => delete category.custom);
  const query = `
   mutation updateCategories($data: CategoriesInputType!) {
      updateCategories(data: $data) {
        id
        name
        rank
      }
    }`;

  const trimmed = categories.map(c => ({
    id: c.id,
    name: c.name,
    rank: c.rank
  }));

  const variables = { data: { categories: trimmed } };
  return authClient.rawRequest(query, variables);
}

export function getUsers() {
  const query = `
  query {
    users {
      id
      name
    }
  }`;

  return authClient.rawRequest(query);
}

export function getAllUsers() {
  const query = `
  query {
    usersAll {
      id
      name
    }
  }`;

  return authClient.rawRequest(query);
}

export function getTags() {
  const query = `
  query {
    tags {
      id
      name
    }
  }`;

  return authClient.rawRequest(query);
}

export function shareMerm(mermId, users) {
  const query = `
   mutation shareMerm($id: ID!, $users: [ID!]) {
      shareMerm(id: $id, users: $users) {
        id
        name
        sharedWith {
          id
          name
        }
      }
    }`;
  const variables = {
    id: mermId,
    users
  };
  return authClient.rawRequest(query, variables);
}

export function getSharedMerms(userId) {
  const query = `
  query {
    sharedMerms {
      id
      name
      lastAccessed
      owner {
        id
        name
      }
      contentType
      tags {
        id
        name
      }
      shares(user_id: ${userId}) {
        id
        sharer {
          id
          name
        }
        sharedWith {
          id
          name
        }
        createdAt
      }
    }
  }`;

  return authClient.rawRequest(query);
}

export function copyMerm(id) {
  const query = `
   mutation copyMerm($id: ID!) {
      copyMerm(id: $id) {
        id
        name
        sharedWith {
          id
          name
        }
      }
    }`;
  const variables = { id };
  return authClient.rawRequest(query, variables);
}

export function logMermAccess(id) {
  const query = `
   mutation logMermAccess($id: ID!) {
      logMermAccess(id: $id) {
        id
      }
    }`;
  const variables = { id };
  return authClient.rawRequest(query, variables);
}
