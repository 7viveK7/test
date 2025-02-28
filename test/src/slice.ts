import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



const initialState = {
    data: [],
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setcurrentData: (state, action) => {
            
            // console.log({"dsf_":action.payload})
            state.data = action.payload
        },

        deleteData: (state, action: PayloadAction<number>) => {
            state.data = state.data.filter((item, index) => item.id !== action.payload)
        },
        updateData: (state, action) => {
            // console.log({"dsf":action.payload})
            state.data = state.data.map((item, index) => {
                if (item.id === action.payload.id) {
                    return {...item, ...action.payload}
                }
                return item
            })
        },
        sortingData: (state, action: PayloadAction<string>) => {
            if (action.payload === 'asc') {
                state.data = state.data.sort((a, b) => a.id - b.id)
            } else {
                state.data = state.data.sort((a, b) =>  b.id - a.id)
            }


        }
    }
})

// Action creators are generated for each case reducer function
export const { setcurrentData, deleteData, updateData, sortingData } = counterSlice.actions

export default counterSlice.reducer