import {
  GET_BLOGS,
  GET_BLOG,
  GET_ALLBLOGS,
  ADD_BLOG,
  DELETE_BLOG,
  SET_CURRENT,
  SET_FILEPATH,
  CLEAR_CURRENT,
  UPDATE_BLOG,
  FILTER_BLOGS,
  FILTER_ALLBLOGS,
  CLEAR_FILTER,
  BLOG_ERROR,
  CLEAR_BLOGS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_BLOGS:
      return {
        ...state,
        blogs: action.payload,
        loading: false,
      };
    case GET_BLOG:
      return {
        ...state,
        blog: action.payload,
        loading: false,
      };
    case GET_ALLBLOGS:
      return {
        ...state,
        allBlogs: action.payload,
        loading: false,
      };
    case ADD_BLOG:
      return {
        ...state,
        blogs: [action.payload, ...state.blogs],
        loading: false,
      };
    case UPDATE_BLOG:
      return {
        ...state,
        blogs: state.blogs.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog
        ),
        loading: false,
      };
    case DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog._id !== action.payload),
        loading: false,
      };
    case CLEAR_BLOGS:
      return {
        ...state,
        blogs: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case SET_FILEPATH:
      return { ...state, filePath: action.payload };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_BLOGS:
      return {
        ...state,
        filtered: state.blogs.filter((blog) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return blog.title.match(regex) || blog.detail.match(regex);
        }),
      };
    case FILTER_ALLBLOGS:
      return {
        ...state,
        filteredAll: state.allBlogs.filter((blog) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return blog.title.match(regex) || blog.detail.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
        filteredAll: null,
      };
    case BLOG_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
