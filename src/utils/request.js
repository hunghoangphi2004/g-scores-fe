const API_DOMAIN = process.env.REACT_APP_API_DOMAIN || "http://localhost:3000/api";

export const get = async (path) => {
  const response = await fetch(API_DOMAIN + path);
  const result = await response.json();
  return result;
}