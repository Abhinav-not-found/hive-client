import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_GATEWAY_URL_PROD ||
  process.env.NEXT_PUBLIC_GATEWAY_URL;

export const createPost = async (description, images, userId) => {

  const formData = new FormData();
  formData.append("description", description);

  images.forEach((file) => formData.append("images", file));

  const res = await axios.post(`${API_URL}/post/create/${userId}`, formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

  return res.data;
};

export const getProfilePosts = async (userId) => {
  const res = await axios.get(`${API_URL}/post/getProfilePosts/${userId}`);
  return res.data.data
};
export const handleDeletePost = async (postId) => {
  const res = await axios.delete(`${API_URL}/post/delete/${postId}`)
  return res.data
}

export const getFeed = async (page, limit) => {
  try {
    const res = await axios.get(`${API_URL}/post/feed?page=${page}&limit=${limit}`);
    return res.data
  } catch (error) {
    console.log(error);
  }
};
