import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = import.meta.env.VITE_API_URL;

export interface Book {
  title: string;
  author?: string;
  description?: string;
  datePublished?: Date;
  keywords?: string; 
  bookType?: string;
  bookCoverImage?: string;
  bookDocument?: string;
};

export interface BookList {
    books?: Book[] | any[];
    success: boolean;
    loading: boolean;
    error: boolean;
    message: string;
};

export interface BookView {
    book?: Book | {};
    success: boolean;
    loading: boolean;
    error: boolean;
    message: string;
};

interface BookForm {
    success: boolean;
    loading: boolean;
    error: boolean;
    message: string;
};

export interface BookState {
    bookList: BookList;
    bookView: BookView;
    bookForm: BookForm;
};

const initialState: BookState = {
    bookList: {
        books: [],
        success: false,
        loading: false,
        error: false,
        message: "",
    },
    bookView: {
        book: {},
        success: false,
        loading: false,
        error: false,
        message: "",
    },
    bookForm: {
        success: false,
        loading: false,
        error: false,
        message: "",
    },
};

export const getAllBooks = createAsyncThunk(
    'book/all',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${backendURL}/api/books/all`);
            return data;
        } catch (err: any) {
            if (err.response && err.response.data.message) {
                return rejectWithValue(err.response.data.message)
              } else {
                return rejectWithValue(err.message)
              }
        }
    }
);

export const addBook = createAsyncThunk(
    'book/add',
    async (book: Book, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                  'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.post(
                `${backendURL}/api/books/add`,
                book,
                config
            );
            return data;
        } catch (err: any) {
            if (err.response && err.response.data.message) {
                return rejectWithValue(err.response.data.message)
              } else {
                return rejectWithValue(err.message)
              }
        }
    }
);

export const editBook = createAsyncThunk(
    'book/edit',
    async (book: Book, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                  'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.post(
                `${backendURL}/api/books/edit`,
                book,
                config
            );
            return data;
        } catch (err: any) {
            if (err.response && err.response.data.message) {
                return rejectWithValue(err.response.data.message)
            } else {
                return rejectWithValue(err.message)
            }
        }
    }
);

export const deleteBook = createAsyncThunk(
    'book/delete',
    async (bookId: string, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`${backendURL}/api/books/delete/${bookId}`);
            return data;
        } catch (err: any) {
            if (err.response && err.response.data.message) {
                return rejectWithValue(err.response.data.message)
              } else {
                return rejectWithValue(err.message)
              }
        }
    }
);

export const getBook = createAsyncThunk(
    'book/get',
    async (bookId: string, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${backendURL}/api/books/${bookId}`);
            return data;
        } catch (err: any) {
            if (err.response && err.response.data.message) {
                return rejectWithValue(err.response.data.message)
              } else {
                return rejectWithValue(err.message)
              }
        }
    }
);

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(addBook.pending, (state) => {
            state.bookForm.loading = true;
            state.bookForm.success = false;
            state.bookForm.error = false;
            state.bookForm.message = "Adding";
        })
        .addCase(addBook.fulfilled, (state, { payload }) => {
            state.bookList.books?.push(payload);
            state.bookForm.loading = false;
            state.bookForm.loading = false;
            state.bookForm.success = true;
            state.bookForm.message = "Book added successfully";
        })
        .addCase(addBook.rejected, (state) => {
            state.bookForm.loading = false;
            state.bookForm.error = true;
            state.bookForm.success = false;
            state.bookForm.message = "Adding Book Failed";
        })
        .addCase(editBook.pending, (state) => {
            state.bookForm.error = false;
            state.bookForm.loading = true;
            state.bookForm.success = false;
            state.bookForm.message = "Editing";
        })
        .addCase(editBook.fulfilled, (state, { payload }) => {
            state.bookForm.loading = false;
            state.bookForm.error = false;
            state.bookForm.success = true;
            state.bookForm.message = "Book edited successfully";
        })
        .addCase(editBook.rejected, (state) => {
            state.bookForm.loading = false;
            state.bookForm.error = true;
            state.bookForm.success = false;
            state.bookForm.message = "Editing Book Failed";
        })
        .addCase(deleteBook.pending, (state) => {
            state.bookForm.error = false;
            state.bookForm.loading = true;
            state.bookForm.success = false;
            state.bookForm.message = "Deleting";
        })
        .addCase(deleteBook.fulfilled, (state, { payload }) => {
            state.bookForm.loading = false;
            state.bookForm.error = false;
            state.bookForm.success = true;
            state.bookForm.message = "Book deleted successfully";
        })
        .addCase(deleteBook.rejected, (state) => {
            state.bookForm.loading = false;
            state.bookForm.error = true;
            state.bookForm.success = false;
            state.bookForm.message = "Deleting Book Failed";
        })
        .addCase(getAllBooks.pending, (state) => {
            state.bookList.loading = true;
            state.bookList.error = false;
            state.bookList.success = false;
            state.bookList.message = "Loading Books";
        })
        .addCase(getAllBooks.fulfilled, (state, { payload }) => {
            state.bookList.books = payload;
            state.bookList.loading = false;
            state.bookList.error = false;
            state.bookList.success = true;
            state.bookList.message = "Books loaded successfully";
        })
        .addCase(getAllBooks.rejected, (state) => {
            state.bookList.loading = false;
            state.bookList.error = true;
            state.bookList.success = false;
            state.bookList.message = "Loading Books Failed";
        })
        .addCase(getBook.pending, (state) => {
            state.bookView.loading = true;
            state.bookView.error = false;
            state.bookView.success = false;
            state.bookView.message = "Loading Book";
        })
        .addCase(getBook.fulfilled, (state, { payload }) => {
            state.bookView.book = payload;
            state.bookView.loading = false;
            state.bookView.error = false;
            state.bookView.success = true;
            state.bookView.message = "Book loaded successfully";
        })
        .addCase(getBook.rejected, (state) => {
            state.bookView.loading = false;
            state.bookView.error = true;
            state.bookView.success = false;
            state.bookView.message = "Loading Book Failed";
        })
    },
});

export default bookSlice.reducer;