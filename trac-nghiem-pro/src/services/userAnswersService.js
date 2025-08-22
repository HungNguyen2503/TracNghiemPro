import { get, post } from "../utils/requests";


export const getUserAllAnswer = async (userId) => {
  const res = await get(`userAnswers?userId=${userId}`);
  if (res.ok) {
    const data = await res.json();
    if (!data) return null;
    return data;
  }
  return null;
}

export const getUserAnswer = async (id) => {
  const res = await get(`userAnswers/${id}`);
  if (res.ok) {
    const data = await res.json();
    if (!data) return null;
    return data;
  }
  return null;
}

export const postUserAnswer = async (userAnswer) => {
  const res = await post("userAnswers", userAnswer);
  if (res.ok) {
    const data = await res.json();
    if (!data) return null;
    return data;
  }
  return null;
}