import {
  configureStore,
  createSlice,
  createAction,
  PayloadAction,
} from '@reduxjs/toolkit'

import { bookType } from '../utils/types'

const getInitialBooksState = (): bookType[] => {
  const storedState = localStorage.getItem('booksCart')
  return storedState ? JSON.parse(storedState) : []
}

export const reset = createAction('app/books')

const booksSlice = createSlice({
  name: 'books',
  initialState: getInitialBooksState(),
  reducers: {
    addBook(state, action: PayloadAction<bookType>) {
      const ind = state.findIndex((item) => item.name === action.payload.name)
      if (ind !== -1) {
        state[ind].qty += 1
      } else {
        state.push(action.payload)
      }
      localStorage.setItem('booksCart', JSON.stringify(state))
    },
    removeBook(state, action: PayloadAction<bookType>) {
      const ind = state.findIndex((item) => item.name === action.payload.name)
      state[ind].qty -= 1
      if (state[ind].qty === 0) {
        state.splice(ind, 1)
      }
      localStorage.setItem('booksCart', JSON.stringify(state))
    },
  },
  extraReducers(builder) {
    builder.addCase(reset, (state, action) => {
      return []
    })
  },
})

export const store = configureStore({
  reducer: { books: booksSlice.reducer },
})

export const { addBook, removeBook } = booksSlice.actions
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
