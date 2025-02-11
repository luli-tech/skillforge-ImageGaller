import {
    configureStore,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import url from "../apis";
import 'react-toastify/dist/ReactToastify.css';

function getFavourite(favourite) {
    localStorage.setItem("favourites", JSON.stringify(favourite));
}

const initialState = {
    photos: JSON.parse(localStorage.getItem("photos") || "[]"),
    allPhotos: JSON.parse(localStorage.getItem("photos") || "[]"),
    favourite: JSON.parse(localStorage.getItem("favourites") || "[]"),
    isLoading: false,
    error: null,
    isDarkMode: JSON.parse(localStorage.getItem("isDarkMode") || "false"),
};

export const fetchData = createAsyncThunk(
    "data/fetchData",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                return thunkAPI.rejectWithValue("Failed to fetch data");
            }
            return await response.json();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || "An error occurred");
        }
    }
);

const photoSlice = createSlice({
    name: "photo",
    initialState,
    reducers: {
        addToFavourite(state, action) {
            let exist = state.favourite.find(
                (photo) => photo.id == action.payload.id
            );
            if (!exist) {
                state.message = "Photo added to Favourite";
                state.favourite.push(action.payload);
                toast.success(state.message)
            } else {
                state.message = "Photo already addded to Favourite";
                toast.info(state.message)
            }
            getFavourite(state.favourite);
        },
        removeFromFavourite(state, action) {
            state.favourite = state.favourite.filter(
                (photo) => photo.id !== action.payload.id
            );
            state.message = "Photo removed from Favourite";
            toast.success(state.message);
            getFavourite(state.favourite);
        },
        handleSearch(state, action) {
            const query = action.payload.trim();
            localStorage.setItem("searchQuery", query);

            if (!query || isNaN(query)) {
                state.photos = [...state.allPhotos];
                localStorage.setItem("filteredPhotos", JSON.stringify(state.allPhotos));
                state.message = "No search query found. ID should be a number";
                toast.error(state.message);
                return;

            }

            state.photos = state.allPhotos.filter((photo) =>
                photo.id.toString().includes(query)
            );

            localStorage.setItem("filteredPhotos", JSON.stringify(state.photos));
        },
        getDarkMode(state) {
            state.isDarkMode = !state.isDarkMode;
            localStorage.setItem("isDarkMode", JSON.stringify(state.isDarkMode));
            state.message = state.isDarkMode ? "Dark Mode Enabled" : "Light Mode Enabled";
            toast.info(state.message);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.photos = action.payload;
                state.allPhotos = action.payload;
                localStorage.setItem("photos", JSON.stringify(action.payload));
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.isLoading = false;
                state.message = "Failed to fetch data";
                toast.error(state.message);
            });
    },
});

export const {
    addToFavourite,
    removeFromFavourite,
    handleSearch,
    getDarkMode,
} = photoSlice.actions;

const store = configureStore({
    reducer: {
        photo: photoSlice.reducer,
    },
});

export default store;
