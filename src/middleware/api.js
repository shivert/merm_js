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

export function createMerm(fields) {
  const query = `
    mutation createMerm ($mermDetails: MermInputType!) {
      createMerm(mermDetails: $mermDetails) {
        id
      }
    }
  `;

  const variables = {
    mermDetails: {
      name: fields.name,
      capturedText: fields.capturedText,
      description: fields.description,
      resourceUrl: fields.resourceUrl,
      tags: fields.tags
    }
  };

  return client.rawRequest(query, variables);
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
      contentType
      lastAccessed
      createdAt
      updatedAt
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
        owner {
          id  
          name
        }
        category {
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
        lastAccessed
        createdAt
        updatedAt
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
      }
    }`;
  const variables = { data: { categories } };
  return authClient.rawRequest(query, variables);
}
