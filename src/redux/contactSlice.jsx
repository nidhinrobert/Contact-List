import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const getContact = createAsyncThunk('getContact', async ({currentPage,itemsPerPage,search}) => {

    try {
        const response = await axios.get(`http://localhost:4001/api/contacts?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&search=${search}`);
    
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error(error, "filed to retrieve Users")
    }
});



export const addContact = createAsyncThunk('users/addContact', async (contact) => {

    const formData = new FormData();
    formData.append('firstname', contact.firstname);
    formData.append('lastname', contact.lastname);
    formData.append('email', contact.email);
    formData.append('phone', contact.phone);
    formData.append('image', contact.image);

    try {
        const response = await axios.post('http://localhost:4001/api/contacts', formData);

        if (!response.data) {
            throw new Error('Failed to add contact');

        }
        return response.data;
    } catch (error) {
        throw new Error('Failed to add contact');
    }

});

export const getContactbyId = createAsyncThunk('users/getgetContactbyId', async (id) => {
    try {
        const response = await axios.get(`http://localhost:4001/api/contacts/${id}`);
        if (!response.data) {
            throw new Error('failed to get data')
        }
        return response.data
    } catch (error) {
        throw new Error("failed to retrieve data")
    }
})

export const editContact = createAsyncThunk('users/editContact', async (data) => {
    const id = data.id;

    const formData = new FormData();
    formData.append('firstname', data.firstname);
    formData.append('lastname', data.lastname);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('image', data.image);

    try {
        const response = await axios.put(`http://localhost:4001/api/contacts/${id}`, formData)

        if (!response.data) {
            throw new Error("Failed to edit contact");
        }
        return { id, data: response.data };
    } catch (error) {
        throw new Error("Failed to edit contact")
    }
})



export const deleteContact = createAsyncThunk('users/deleteContact', async (id) => {
    try {
        const response = await axios.delete(`http://localhost:4001/api/contacts/${id}`)
        if (!response.data) {
            throw new Error("Failed to delete contact");
        }
        return response.data;
    } catch (error) {
        throw new Error('failed to delete contact')
    }
})

const initialState = {
    Users: [],
contact:[],
    search:"",
    currentPage:1,
    itemsPerPage:4,
    status: 'idle',
    error: null,
    isAddContact: false,
    isGetContact: false,
    contactsCount:0,
}

const contactSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setIsAddContact: (state, action) => {
            state.isAddContact = action.payload;
        },
        setIsGetContact: (state, action) => {
            state.isGetContact = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setItemsPerPage: (state,action) => {
            state.itemsPerPage = action.payload;
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
           
            .addCase(getContact.fulfilled, (state, action) => {
                state.status = '';
                state.Users = action.payload.contacts;
                state.contactsCount = action.payload.totalCount;
            })
            .addCase(getContact.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.status = "succeded"
                state.Users = state.Users.filter((users) => users._id !== action.payload);
            })
            .addCase(getContactbyId.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(getContactbyId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.contact = action.payload;
            })
            .addCase(getContactbyId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(editContact.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(editContact.fulfilled, (state, action) => {
                const { id, data } = action.payload;
                state.status = 'succeeded';
                state.Users = state.Users.map((users) =>
                    users._id === id ? { ...users, ...data } : users
                );
            })
            .addCase(editContact.rejected, (action, state) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});
export const { setIsAddContact, setIsGetContact,setCurrentPage,setItemsPerPage,setSearchValue} = contactSlice.actions;

export default contactSlice.reducer;
