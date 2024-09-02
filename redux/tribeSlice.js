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


export const findTribeByBelongsId = createAsyncThunk(
  "tribe/findTribeByBelongsId",
  async ({id} , { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}api/tribe/belongs/${id}`);
      return response.data;
    } catch (error) {
      console.log("");
      console.log("id-----", `${BASE_URL}api/tribe/belongs/${id}`);
      console.log("error-----", error);
      console.log("%%%%%%%%error.response", error.response?.data);
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

export const fetchTribeByName = createAsyncThunk(
  "tribe/fetchTribeByname",
  async ({ tribeName }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}api/tribe/tribe/${tribeName}`);
      return response.data;
    } catch (error) {
      console.log("error-----", error);
      console.log("%%%%%%%%error.response", error.response);
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
    tribeList: [],
    // 66bc7999f8fe0fff86a1edff
    tribeList2: [
      {
        "_id": "66bc7999f8fe0fff86a1edf1",
        "climate_know_exist": false,
        "tribe": "Abe",
        "location": {
          "type": "Point",
          "coordinates": [10.0, 11.2],
        },
        "proof_link": [
          {
            "name": "pATER",
            "link": "URL1",
            "owner": "66bc7999f8fe0fff86a1edff",
            "status": "PENDING"
          },
          {
            "name": "wEB",
            "link": "URL2",
            "owner": "66bc7999f8fe0fff86a1edff",
            "status": "PENDING"
          }
        ],
        "images": [
          {
            "link": "URL1",
            "owner": "66bc7999f8fe0fff86a1edff",
            "status": "PENDING"
          },
          {
            "link": "URL2",
            "owner": "66bc7999f8fe0fff86a1edff",
            "status": "PENDING"
          }
        ],
        "owner": "66bc7999f8fe0fff86a1edff",
        "status": "PENDING"
      }, {
        "_id": "66bc7999f8fe0fff86a1edf1",
        "climate_know_exist": false,
        "tribe": "Masai",
        "location": {
          "type": "Point",
          "coordinates": [10.0, 11.2],
        },
        "proof_link": [
          {
            "name": "pATER",
            "link": "URL1",
            "owner": "66bc7999f8fe0fff86a1edff",
            "status": "PENDING"
          },
          {
            "name": "wEB",
            "link": "URL2",
            "owner": "66bc7999f8fe0fff86a1edff",
            "status": "PENDING"
          }
        ],
        "images": [
          {
            "link": "URL1",
            "owner": "66bc7999f8fe0fff86a1edff",
            "status": "PENDING"
          },
          {
            "link": "URL2",
            "owner": "66bc7999f8fe0fff86a1edff",
            "status": "PENDING"
          }
        ],
        "owner": "66bc7999f8fe0fff86a1edff",
        "status": "PENDING"
      }
    ],
    error: null,
    isLoading: false,
    success: false,

    errorByName: null,
    isLoadingByName: false,
    successByName: false,
    tribeByName: null,

    errorCreate: null,
    isLoadingCreate: false,
    successCreate: false,

    errorEdit: null,
    isLoadingEdit: false,
    successEdit: false,

    tribeListBelongs: null,
    errorBelongs: null,
    isLoadingBelongs: false,
    successBelongs: false,

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

    builder
      .addCase(editTribe.pending, (state) => {
        state.isLoadingEdit = true;
        state.errorEdit = null;
        state.successEdit = false
      })
      .addCase(editTribe.fulfilled, (state, action) => {
        state.isLoadingEdit = false;
        state.tribeList.push(action.payload);
        state.errorEdit = null;
        state.successEdit = true
      })
      .addCase(editTribe.rejected, (state, action) => {
        state.isLoadingEdit = false;
        state.errorEdit = action.payload;
        state.successEdit = false
      });

      builder
      .addCase(fetchTribeByName.pending, (state) => {
        state.isLoadingByName = true;
        state.errorByName = null;
        state.successByName = false
      })
      .addCase(fetchTribeByName.fulfilled, (state, action) => {
        state.isLoadingByName = false;
        state.tribeByName = action.payload;
        state.errorByName = null;
        state.successByName = true
      })
      .addCase(fetchTribeByName.rejected, (state, action) => {
        state.isLoadingByName = false;
        state.errorByName = action.payload;
        state.successByName = false
      });

      builder
      .addCase(findTribeByBelongsId.pending, (state) => {
        state.isLoadingBelongs = true;
        state.errorBelongs = null;
        state.successBelongs = false
      })
      .addCase(findTribeByBelongsId.fulfilled, (state, action) => {
        state.isLoadingBelongs = false;
        state.tribeListBelongs = action.payload;
        state.errorBelongs = null;
        state.successBelongs = true
      })
      .addCase(findTribeByBelongsId.rejected, (state, action) => {
        state.isLoadingBelongs = false;
        state.errorBelongs = action.payload;
        state.successBelongs = false
      });
  },
});

export default tribeSlice.reducer;
