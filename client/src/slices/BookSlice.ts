import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

export interface Book {
  title: string;
  author: string;
  description: string;
  datePublished: Date;
  keywords: string;
  bookType: string;
  bookCover: string;
  bookFile: string;
  bookFileFormat: string;
};

export interface BookList {
    books: Book[];
    success: boolean;
    loading: boolean;
    error: any;
};

export interface BookView {
    book: Book | {};
    success: boolean;
    loading: boolean;
    error: any;
};

interface BookState {
    bookList: BookList;
    bookView: BookView;
};

const initialState: BookState = {
    bookList: {
        books: [],
        success: false,
        loading: false,
        error: null,
    },
    bookView: {
        book: {},
        success: false,
        loading: false,
        error: null,
    },
};

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
    },
});

export default bookSlice.reducer;