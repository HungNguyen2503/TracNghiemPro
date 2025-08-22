import { get } from "../utils/requests";

export const getAllTopic = async () => {
  const res = await get(`topics`);
  if (res.ok) {
    const data = await res.json();
    if (!data) return null;
    return data;
  }
  return null;
}

export const getTopic = async (id) => {
  const res = await get(`topics/${id}`);
  if (res.ok) {
    const data = await res.json();
    if (!data) return null;
    return data;
  }
  return null;
}