import Axios from "axios";
const URI = "https://evening-wave-78798.herokuapp.com/login";

const login = async (credentials) => {
  const response = await Axios.post(URI, credentials);
  return response.data;
};
export default { login };
