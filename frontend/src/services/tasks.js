import axios from "axios";
const URI = "https://evening-wave-78798.herokuapp.com/tasks";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getTasks = async () => {
  const config = {
    headers: { authorization: token },
  };
  const response = await axios.get(URI + "/my", config);
  return response.data;
};

const remove = async (task) => {
  const config = {
    headers: { authorization: token },
  };
  const response = await axios.delete(URI + "/" + task._id, config);
  return response;
};

const create = async (task) => {
  const config = { headers: { authorization: token } };
  const response = await axios.post(URI, task, config);
  return response.data;
};

const update = async (task) => {
  const config = { headers: { authorization: token } };
  const response = await axios.put(URI + "/" + task._id, task, config);
  return response.data;
};
export default { getTasks, remove, create, update, setToken };
