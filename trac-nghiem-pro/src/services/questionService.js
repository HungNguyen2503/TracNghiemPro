import { get } from "../utils/requests";

export const getQuestionsTopic = async (topicId) => {
  const res = await get(`questions?topicId=${topicId}`);
  if (res.ok) {
    const data = await res.json();
    if (!data) return null;
    return data;
  }
  return null;
}