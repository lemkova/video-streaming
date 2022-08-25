import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'

const MOVIES_URL = 'https://www.omdbapi.com/'
const API_KEY = '3399d597'

export type MoviesState = {
    moviesList: Array<any> | undefined,
    isLoading: boolean
}

const initialState: MoviesState = {
    moviesList: undefined,
    isLoading: false
}

interface SearchInput {
    title: string
}

export const fetchMovies = createAsyncThunk<any,SearchInput, {state: RootState}>
(
    'movies/searchMovies', 
    async ({title}) => {
    const response = await axios.get(MOVIES_URL, {params: {
        apikey: API_KEY,
        s: title
    }})
    return (response.data) as any
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchMovies.fulfilled, (state : MoviesState, action) => {
            state.moviesList = action.payload.Search
            state.isLoading = false
        })
        builder.addCase(fetchMovies.pending, (state : MoviesState) => {
            state.isLoading = true
        })        
    }
})

export default moviesSlice.reducer