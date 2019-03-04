import axios from "axios";

const authClient = axios.create({
  baseURL: "http://localhost:3000"
});

export const setAuthHeaderSearch = token => {
  authClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export function autoComplete(query) {
  return authClient.get("/search", {
    params: {
      q: query
    }
  });
}

export function search(query) {
  return authClient.get("/custom-search", {
    params: {
      q: query
    }
  });
}

export function loadDashboard() {
  return authClient.get("/search");
}

export function mermsByCategory(category) {
  return authClient.get("/category", {
    params: {
      q: category
    }
  });
}
