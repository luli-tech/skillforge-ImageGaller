import {
    configureStore,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import url from "../apis";
function getFavourite(favourite) {
    localStorage.setItem("favourites", JSON.stringify(favourite));
}



const initialState = {
    photos: JSON.parse(localStorage.getItem("photos") || "[]"),
    allPhotos: JSON.parse(localStorage.getItem("photos") || "[]"),
    favourite: JSON.parse(localStorage.getItem("favourites") || "[]"),
    isLoading: false,
    error: null,
    message: "",
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
                state.favourite.push(action.payload);
                state.message = "item added to bookmark";
            } else {
                state.message = "item already added to favourite";
            }
            getFavourite(state.favourite);
        },
        removeFromFavourite(state, action) {
            state.favourite = state.favourite.filter(
                (photo) => photo.id !== action.payload.id
            );
            state.message = "item removed from bookmark";
            getFavourite(state.favourite);
        },
        handleSearch(state, action) {
            const query = action.payload.trim();
            localStorage.setItem("searchQuery", query);

            if (!query) {
                state.photos = [...state.allPhotos];
                localStorage.setItem("filteredPhotos", JSON.stringify(state.allPhotos));
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
                state.error = action.payload;
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
