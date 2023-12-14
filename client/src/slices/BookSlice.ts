import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const baseURL = "/api/books";

export interface Book {
    id?: string;
    _id?: any;
    title: string;
    author?: string;
    description?: string;
    datePublished?: string;
    keywords?: string; 
    bookType?: string;
    bookCoverImage?: any;
    bookDocument?: any;
    bookCoverImageFn?: string;
    bookDocumentFn?: string;
    createdAt?: any;
    updatedAt?: any;
};

export interface BookList {
    books?: Book[] | any[];
    success: boolean;
    loading: boolean;
    error: boolean;
    message: string;
};

export interface BookView {
    book?: Book;
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
        book: undefined,
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
    `book/all`,
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${baseURL}/all`);
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

export const searchBooks = createAsyncThunk(
    `book/search`,
    async (query: string, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${baseURL}/search/${query}`);
            console.log(data)
            return data;
        } catch (err: any) {
            if (err.response && err.response.data.message) {
                return rejectWithValue(err.response.data.message);
            } else {
                return rejectWithValue(err.message);
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
                  'Content-Type': 'multipart/form-data',
                },
            }
            console.log("Addbook Invoked");
            console.log(book);
            const { data } = await axios.post(
                `${baseURL}/add`,
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
                  'Content-Type': 'multipart/form-data',
                },
            }
            console.log("Thunk!!!!");
            console.log(book);
            const { data } = await axios.post(
                `${baseURL}/edit`,
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
            const { data } = await axios.delete(`${baseURL}/delete/${bookId}`);
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
            const { data } = await axios.get(`${baseURL}/${bookId}`);
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
        resetBookForm: (state) => {
            state.bookForm.loading = false;
            state.bookForm.success = false;
            state.bookForm.error = false;
            state.bookForm.message = "";
        }
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
        .addCase(editBook.fulfilled, (state) => {
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
            state.bookForm.success = false;
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
        .addCase(searchBooks.pending, (state) => {
            state.bookList.loading = true;
            state.bookList.error = false;
            state.bookList.success = false;
            state.bookList.message = "Searching Books";
        })
        .addCase(searchBooks.fulfilled, (state, { payload }) => {
            state.bookList.books = payload;
            state.bookList.loading = false;
            state.bookList.error = false;
            state.bookList.success = true;
            state.bookList.message = "Books searched successfully";
        })
        .addCase(searchBooks.rejected, (state) => {
            state.bookList.loading = false;
            state.bookList.error = true;
            state.bookList.success = false;
            state.bookList.message = "Searching Books Failed";
        });
    },
});

export const { resetBookForm } = bookSlice.actions;

export default bookSlice.reducer;