import { createSlice } from "@reduxjs/toolkit";

const initialFormState = {
    fullName: '',
    size: '',
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
};

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState: initialFormState,
    reducers: {
        updateFullName: (state, action) => {
            state.fullName = action.payload;
        },
        selectSize: (state, action) => {
            state.size = action.payload;
        },
        toggleTopping: (state, action) => {
            const topping = action.payload;
            state[topping] = !state[topping];
        },
        resetForm: () => initialFormState

    }
})

export const { updateFullName, selectSize, toggleTopping, resetForm } = pizzaSlice.actions;

export default pizzaSlice.reducer;
