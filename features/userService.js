import axios from "axios";

const CREATE_USER =
  "https://user-backend-vc38.onrender.com/api/users/create-user";

const createUser = async (details) => {
  try {
    const response = await axios.post(CREATE_USER, details);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const GET_USERS = "https://user-backend-vc38.onrender.com/api/users/get-users";

const getAllUsers = async () => {
  try {
    const response = await axios.get(GET_USERS);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const GET_SINGLE_USER =
  "https://user-backend-vc38.onrender.com/api/users/get-user/";

const getSingleUser = async (id) => {
  try {
    const response = await axios.get(`${GET_SINGLE_USER}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const EDIT_SINGLE_USER =
  "https://user-backend-vc38.onrender.com/api/users/edit-user/";
const editSingleUser = async (id, details) => {
  try {
    const response = await axios.put(`${EDIT_SINGLE_USER}${id}`, details);

    return response.data;
  } catch (error) {
  
    throw error;
  }
};

const DELETE_USER =
  "https://user-backend-vc38.onrender.com/api/users/delete-user/";
const deleteSingleUser = async (id) => {
  try {
    const response = await axios.delete(`${DELETE_USER}${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const userService = {
  createUser,
  getAllUsers,
  getSingleUser,
  editSingleUser,
  deleteSingleUser,
};

export default userService;
