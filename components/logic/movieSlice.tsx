import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'

const MOVIES_URL: string = 'https://www.omdbapi.com/?s=Marvel&apikey=3399d597'

export type MoviesState = {
    moviesList: Array<any>,
    count: number
}

const initialState: MoviesState = {
    moviesList: [],
    count: 1
}

export const fetchMovies = createAsyncThunk<any,void, {state: RootState}>('movies/fetchMovies', async (_, {getState}) => {
    const state = getState()
    console.log(state.movies.count.toString())
    const response = await axios.get(MOVIES_URL + '&page=' + state.movies.count.toString())
    return (response.data) as any
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        increment: (state: MoviesState) => {
            state.count += 1;
        },
        decrement: (state: MoviesState) => {
            state.count -= 1;
        },        
    },
    extraReducers(builder) {
        builder.addCase(fetchMovies.fulfilled, (state : MoviesState, action) => {
            action.payload.Search.forEach((element: any) => {
                state.moviesList.push(element)
            })
            state.count += 1
        })
    }
})

export default moviesSlice.reducer