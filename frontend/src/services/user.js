import axios from "axios";
const URI = "http://localhost:3003/users";

const create = async (credentials) => {
  const response = await axios.post(URI, credentials);
  return response.data;
};

export default { create };
