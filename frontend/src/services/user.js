import axios from "axios";
const URI = "https://evening-wave-78798.herokuapp.com/users";

const create = async (credentials) => {
  const response = await axios.post(URI, credentials);
  return response.data;
};

export default { create };
