import api from "./api";

export const createPost = async (postData) => {
  const res = await api.post("/posts", postData);
  return res.data;
};


export const getPosts = async () => {
  const res = await api.get("/posts");
  return res.data;
};

export const toggleLike = async (postId) => {
  const res = await api.put(`/posts/${postId}/like`);
  return res.data;
};


export const getMyPosts = async () => {
  const { data } = await api.get("/posts/my-posts");
  return data;
};


export const deletePost = async (id) => {
  const { data } = await api.delete(`/posts/${id}`);
  return data;
};

