import axios from "axios";
const URI = "/users";

const create = async (credentials) => {
  const response = await axios.post(URI, credentials);
  return response.data;
};

export default { create };
