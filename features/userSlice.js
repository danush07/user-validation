import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService"; 

const initialState = {
  users: [],
  singleUser: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};


export const createUser = createAsyncThunk(
  "users/createUser",
  async (userDetails, thunkAPI) => {
    try {
      const response = await userService.createUser(userDetails);
      return response;
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await userService.getAllUsers();
      return response;
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSingleUser = createAsyncThunk(
  "users/getSingleUser",
  async (userId, thunkAPI) => {
    try {
      const response = await userService.getSingleUser(userId);
      return response;
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async (userDetails, thunkAPI) => {
    try {
      const response = await userService.editSingleUser(
        userDetails.userId,
        userDetails
      );
      return response;
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, thunkAPI) => {
    try {
      const response = await userService.deleteSingleUser(userId);
      return response; 
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getSingleUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleUser = action.payload;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const editedUserIndex = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (editedUserIndex !== -1) {
          state.users[editedUserIndex] = action.payload;
        }
        if (state.singleUser.id === action.payload.id) {
          state.singleUser = action.payload;
        }
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
