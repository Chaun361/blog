import { createAsyncThunk, createReducer, createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
    try {
        const response = await axios.get(POSTS_URL);
        return response.data;
    }
    catch (err) {
        return err.message;
    }
})

export const addPost = createAsyncThunk('post/addPost', async (initialPost) => {
    try {
        const response = await axios.post(POSTS_URL, initialPost);
        return response.data;
    }
    catch (err) {
        return err.message;
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload);
            },
            prepare(title, body, userId) {
                return{
                    payload: {
                        id: nanoid(),
                        title,
                        body,
                        userId,
                        date: new Date().toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },
        postEdited: {
            reducer(state, action) {
                const {postId, title, body} = action.payload;
                const existingPost = state.posts.find(post => post.id === Number(postId));
                if (existingPost) {
                    existingPost.title = title;
                    existingPost.body = body;
                }
                
                existingPost.date = new Date().toISOString();
            }
        },
        reactionAdded: {
            reducer(state, action) {
                const {postId ,reaction} = action.payload;
                const existingPost = state.posts.find(post => post.id === postId);
                if (existingPost) {
                    existingPost.reactions[reaction]++;
                }
            }
        }
    },
    extraReducers(builder) {
        //ฟังก์ชันนอกเหนือจาก reducer?
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading';
            })
            // for new post 
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                
                //Adding date and reaction
                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    // what is sub?
                    post.date = sub(new Date(), {minutes: min++}).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }

                    return post;
                });

                state.posts = loadedPosts;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.err.message;
            })
            .addCase(addPost.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const posts = state.posts;
                
                action.payload.id = posts[posts.length - 1].id + 1;
                action.payload.userId = Number(action.payload.userId);
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }

                state.posts.push(action.payload);
            })
    }
})

export const { postAdded, postEdited, reactionAdded } = postsSlice.actions;

export const selectAllPosts = (state) => state.posts.posts; 
export const getPostsStatus = (state) => state.posts.status; 
export const getPostsError = (state) => state.posts.error; 

export default postsSlice.reducer;
