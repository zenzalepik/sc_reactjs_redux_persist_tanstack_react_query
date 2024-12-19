import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsersApi, addUserApi } from '../../api/userApi';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  console.log('fetch redux');
  return fetchUsersApi();
});

export const addUser = createAsyncThunk('users/addUser', async (user) => {
  //  const response = await addUserApi(user);
  // console.log('API Response:', response); // Cetak respons API di sini
  return addUserApi(user);
});
