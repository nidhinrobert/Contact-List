import {configureStore} from '@reduxjs/toolkit'
import contactSlice from './contactSlice'
const store = configureStore({
    reducer: {
        users : contactSlice,
    }
})
export default store