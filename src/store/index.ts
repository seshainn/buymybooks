import {
  configureStore,
  createSlice,
  createAction,
  PayloadAction,
} from '@reduxjs/toolkit'

import { bookType } from '../utils/types'

export const reset = createAction('app/books')

const booksSlice = createSlice({
  name: 'books',
  initialState: [] as bookType[],
  reducers: {
    addBook(state, action: PayloadAction<bookType>) {
      const ind = state.findIndex((item) => item.name === action.payload.name)
      if (ind !== -1) {
        state[ind].qty += 1
      } else {
        state.push(action.payload)
      }
    },
    removeBook(state, action: PayloadAction<bookType>) {
      const ind = state.findIndex((item) => item.name === action.payload.name)
      state.splice(ind, 1)
    },
  },
  extraReducers(builder) {
    builder.addCase(reset, (state, action) => {
      return []
    })
  },
})

export const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
  },
})

export const { addBook, removeBook } = booksSlice.actions
