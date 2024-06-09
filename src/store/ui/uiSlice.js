import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDataModalOption: false
    },
    reducers: {
        onOpenModal: (state) =>{
            state.isDataModalOption = true
        },
        onCloseModal: (state) =>{
            state.isDataModalOption = false
        }
    },
});

    // Action creators are generated for each case reducer function
export const {onOpenModal, onCloseModal } = uiSlice.actions;