import axios from "axios";

export default {
  async post(currentPost) {
    let data = await axios.post("http://localhost:8000/api/post", currentPost, {
      withCredentials: true,
    });
    return data;
  },
  async getPost() {
    let data = await axios.get("http://localhost:8000/api/post");
    return data;
  },

  async commentPost(comment) {
    let data = await axios.post("http://localhost:8000/api/comment", comment, {
      withCredentials: true,
    });
    return data;
  },
};
