import Axios from "axios";
const baseUrl = "http://localhost:3003/login";

const login = async (credentials) => {
  const response = await Axios.post(baseUrl, credentials);
  return response.data;
};
export default { login };
