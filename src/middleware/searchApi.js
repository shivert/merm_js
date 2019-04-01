import axios from "axios";

const authClient = axios.create({
  baseURL: `http://${location.hostname}:3000`
});

export const setAuthHeaderSearch = token => {
  authClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export function autoComplete(query) {
  return authClient.get("/merms", {
    params: {
      q: query
    }
  });
}

export function search(queryParams) {
  return authClient.get("/search", {
    params: queryParams
  });
}

export function advancedSearch(params) {
  return authClient.get("/advanced-search", {
    params: params
  });
}

export function loadDashboard() {
  return authClient.get("/dashboard");
}

export function getFavMerms() {
  return authClient.get("/search-favorite");
}

export function getRecentMerms() {
  return authClient.get("/search-recent");
}

export function getSharedMerms() {
  return authClient.get("/search-shared");
}

export function getExpiredMerms() {
  return authClient.get("/search-expired");
}

export function getDashboardCategories() {
  return authClient.get("/categories");
}

export function mermsByCategory(category) {
  return authClient.get("/search-category", {
    params: {
      q: category
    }
  });
}
