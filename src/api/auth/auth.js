import axios from "axios";

export default {
  async authenticated() {
    let data = await axios.get("http://localhost:8000/api/user", {
      withCredentials: true,
    });
    return data;
  },
  async login(user) {
    let data = await axios.post("http://localhost:8000/api/login", user, {
      withCredentials: true,
    });
    return data;
  },
  async logout(user) {
    let data = await axios.post("http://localhost:8000/api/logout", user, {
      withCredentials: true,
    });
    return data;
  },
  async register(user) {
    let data = await axios.post("http://localhost:8000/api/register", user);
    return data;
  },
};
