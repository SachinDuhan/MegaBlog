import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dbService from "../appwrite/dbService";
import { Query } from "appwrite";

interface PostState {
    userPosts: null | {[key:string]:any}
    allPosts: null | {[key:string]:any}
    activePosts: null | {[key:string]:any}
}

const initialState:PostState = {
    allPosts: null,
    userPosts: null,
    activePosts:null
}

export const fetchAllPosts = createAsyncThunk(
    'allPosts/fetchByQuery',
    async (queries, thunkAPI) => {
        const posts = await dbService.getPosts([])
        return posts || {}
    }
)

export const fetchActivePosts = createAsyncThunk(
    'activePosts/fetchByQuery',
    async (queries, thunkAPI) => {
        const posts = await dbService.getPosts()
        return posts || {}
    }
)

export const fetchUserPosts = createAsyncThunk(
    'userPosts/fetchByQuery',
    async ({userId}:{userId:string}, thunAPI) => {
        const posts = await dbService.getPosts([Query.equal("userId", userId)])
        return posts || {}
    }
)

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        clearPosts: (state)=> {
            state.allPosts = null,
            state.userPosts = null
        }
    },
    extraReducers: (builder)=> {
        builder.addCase(fetchAllPosts.fulfilled, (state, action)=> {
            state.allPosts = action.payload;
            
        })
        .addCase(fetchUserPosts.fulfilled, (state,action)=> {
            state.userPosts = action.payload;
            
        })
        .addCase(fetchActivePosts.fulfilled, (state, action)=> {
            state.activePosts = action.payload
            
        })
    }
})

export default postSlice.reducer

export const {clearPosts} = postSlice.actions;