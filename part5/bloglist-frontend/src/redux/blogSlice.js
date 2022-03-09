import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationSlice";

const user = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    likeABlog(state, action) {
      const updatedObj = action.payload;
      return state.map((pblog) => {
        if (pblog.id === updatedObj.id) {
          return {
            ...pblog,
            likes: updatedObj.likes,
          };
        }
        return pblog;
      });
    },
    filterABlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { setBlogs, appendBlog, likeABlog, filterABlog } = user.actions;

export const initialBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch(setBlogs(blogs));
};

export const createBlog = (blogObj) => async (dispatch) => {
  try {
    const blog = await blogService.create(blogObj);
    dispatch(appendBlog(blog));
    dispatch(setNotification(`added title: ${blogObj.title}`, 5000));
  } catch (error) {
    setNotification(error.message, 5000, true);
  }
};

export const incrementLike = (id) => async (dispatch) => {
  try {
    const updatedBlog = await blogService.likeABlog(id);
    dispatch(likeABlog(updatedBlog));
    dispatch(setNotification(`voted title: ${updatedBlog.title}`));
  } catch (error) {
    dispatch(setNotification("no estas autorizado", 5000, true));
  }
};

export const delBlog = (id) => async (dispatch) => {
  await blogService.deleteBlog(id);
  dispatch(filterABlog(id));
};

export default user.reducer;
