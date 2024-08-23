import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants/utils";

// Here, we are using the createAsyncThunk function to create an asynchronous thunk to POST
// Then we define a new slice called tribeSlice with an initial state containing 
// an empty list of tribes, isLoading flag, and an error message if any.

export const fetchTribes = createAsyncThunk(
  "tribe/fetchTribes",
  async () => {
    const response = await axios.get(
      `${BASE_URL}api/tribe/`
    );
    return response.data;
  }
);

export const fetchTribeByName = createAsyncThunk(
  "tribe/fetchTribeByname",
  async ({ tribeName }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}api/tribe/tribe/${tribeName}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        // Request was made but no response was received
        return rejectWithValue('No response received from server');
      } else {
        // Something happened in setting up the request
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createTribe = createAsyncThunk(
  "tribe/createTribe",
  async ({
    climate_know_exist,
    tribe,
    climate_change_in_lang,
    location,
    proof_link,
    images,
    owner
  }, { rejectWithValue }) => {
    try {
      const response = await axios.post(BASE_URL + 'api/tribe', {
        climate_know_exist,
        tribe,
        climate_change_in_lang,
        location,
        proof_link,
        images,
        owner,
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        // Request was made but no response was received
        return rejectWithValue('No response received from server');
      } else {
        // Something happened in setting up the request
        return rejectWithValue(error.message);
      }
    }
  }
);

export const editTribe = createAsyncThunk(
  "tribe/editTribe",
  async ({
    id,
    climate_know_exist,
    tribe,
    climate_change_in_lang,
    location,
    proof_link,
    images,
    owner
  }, { rejectWithValue }) => {
    try {
      const url = `${BASE_URL}api/tribe/${id}`; // Concatenate ID to the base URL
      const response = await axios.put(url, { // Use PUT request for updating
        climate_know_exist,
        tribe,
        climate_change_in_lang,
        location,
        proof_link,
        images,
        owner
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        // Request was made but no response was received
        return rejectWithValue('No response received from server');
      } else {
        // Something happened in setting up the request
        return rejectWithValue(error.message);
      }
    }
  }
);

// TODO: .get("/:id",
// TODO: .delete("/:id",


const tribeSlice = createSlice({
  name: "tribes",
  initialState: {
    tribeList: null,
    error: null,
    isLoading: false,
    success: false,

    errorCreate: null,
    isLoadingCreate: false,
    successCreate: false,

    errorEdit: null,
    isLoadingEdit: false,
    successEdit: false,

  },
  reducers: {
  },
  // In the extraReducers field, we define how the state should change when the asynchronous
  // thunk fetchTribes is in a pending, fulfilled, or rejected state. 
  extraReducers: (builder) => {
    builder
      .addCase(fetchTribes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false
      })
      .addCase(fetchTribes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tribeList = action.payload;
        state.error = null;
        state.success = true
      })
      .addCase(fetchTribes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false
      });

      builder
      .addCase(createTribe.pending, (state) => {
        state.isLoadingCreate = true;
        state.errorCreate = null;
        state.successCreate = false
      })
      .addCase(createTribe.fulfilled, (state, action) => {
        state.isLoadingCreate = false;
        state.tribeList.push(action.payload);
        state.errorCreate = null;
        state.successCreate = true
      })
      .addCase(createTribe.rejected, (state, action) => {
        state.isLoadingCreate = false;
        state.errorCreate = action.payload;
        state.successCreate = false
      });
  },
});

export default tribeSlice.reducer;
