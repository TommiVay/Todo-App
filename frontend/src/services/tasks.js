import axios from "axios";

const URI = "http://localhost:3003/tasks";

const getAll = async () => {
  const response = await axios.get(URI);
  return response.data;
};

const remove = async (task) => {
  const response = await axios.delete(URI + "/" + task._id);
  return response;
};

const create = async (task) => {
  const response = await axios.post(URI, task);
  return response.data;
};

const update = async (task) => {
  const response = await axios.put(URI + "/" + task._id, task);
  return response.data;
};

export default { getAll, remove, create, update };
