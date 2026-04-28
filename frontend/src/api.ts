const API_URL = "http://localhost:8000";

export interface User {
  id: string;
  username: string;
}

export interface Category {
  id: string;
  user_id: string;
  name: string;
  icon: string;
  order: number;
}

export interface Link {
  id: string;
  user_id: string;
  category_id: string;
  title: string;
  url: string;
  description: string;
  favicon: string;
  is_valid: boolean;
  click_count: number;
}

class ApiClient {
  private token: string = "";

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("token", token);
  }

  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem("token") || "";
    }
    return this.token;
  }

  async request(path: string, options: RequestInit = {}) {
    const headers = {
      "Content-Type": "application/json",
      ...(this.getToken() ? { Authorization: `Bearer ${this.getToken()}` } : {}),
      ...options.headers,
    };
    const res = await fetch(`${API_URL}${path}`, { ...options, headers });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async register(username: string, password: string) {
    return this.request("/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
  }

  async login(username: string, password: string) {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    const res = await fetch(`${API_URL}/token`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    this.setToken(data.access_token);
    return data;
  }

  async getCategories(): Promise<Category[]> {
    return this.request("/categories");
  }

  async createCategory(name: string, icon: string = "📁"): Promise<Category> {
    return this.request("/categories", {
      method: "POST",
      body: JSON.stringify({ name, icon }),
    });
  }

  async getLinks(categoryId?: string): Promise<Link[]> {
    const query = categoryId ? `?category_id=${categoryId}` : "";
    return this.request(`/links${query}`);
  }

  async createLink(link: Omit<Link, "id" | "user_id" | "favicon" | "is_valid" | "click_count">): Promise<Link> {
    return this.request("/links", {
      method: "POST",
      body: JSON.stringify(link),
    });
  }
}

export const api = new ApiClient();