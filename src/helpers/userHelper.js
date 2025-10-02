import { useUserStore } from '@/store/userStore';
import axios from 'axios';
import { toast } from 'sonner';

const API_URL =
  process.env.NEXT_PUBLIC_GATEWAY_URL_PROD ||
  process.env.NEXT_PUBLIC_GATEWAY_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const getUserInfo = async () => {
  const { user, setUser, clearUser } = useUserStore.getState();
  try {
    const res = await axios.get(`${API_URL}/auth/getUserInfo/${user._id}`, {
      withCredentials: true,
    });
    setUser(res.data.data);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      toast.info('Session over, Please login again')
      await axios.post(`${API_URL}/auth/logout`);
      clearUser();
    }
  }
};

export const handleProfileInfoUpdate = async ({ name, bio, userId }) => {
  const res = await api.put(`${API_URL}/auth/update/${userId}`, { name, bio }, { withCredentials: true });
  return res.data
};


export const handleChange = async ({ e, setPreview, userId }) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  setPreview(url);

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await api.put(`${API_URL}/auth/upload/${userId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setPreview(res.data.url);
    toast.success(res.data.message);
  } catch (err) {
    console.error(err);
    toast.error("Failed to upload image");
  }
};

export const handleLogout = async ({ setLoading, router, clearUser }) => {
  setLoading(true);
  try {
    const res = await api.post(`/auth/logout`);
    toast.success(res.data.message);
    clearUser();
    router.push("/");
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

export const handleLogin = async ({ email, password }) => {
  try {
    const res = await axios.post(
      `${API_URL}/auth/login`,
      { email, password },
      { withCredentials: true }
    );
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const handleRegister = async ({ name, email, password }) => {
  try {
    const res = await axios.post(
      `${API_URL}/auth/register`,
      { name, email, password },
      { withCredentials: true }
    );
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const getUserInfoById = async (userId) => {
  const res = await axios.get(`${API_URL}/auth/getUserInfoById/${userId}`)
  return res.data
}
