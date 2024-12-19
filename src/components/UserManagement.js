import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUsersApi, addUserApi } from '../api/userApi';
import { fetchUsers, addUser } from '../redux/actions/userActions';

const UserManagement = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { users, isLoading, error } = useSelector((state) => state.users);

  const { refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    onSuccess: (data) => {
      dispatch({ type: 'users/fetchUsers/fulfilled', payload: data });
    },
  });

  const [isAdding, setIsAdding] = useState(false); // State untuk menandai status loading saat menambahkan user

  // useMutation for adding a user
   const addUserMutation = useMutation({
     mutationFn: addUserApi,
     onMutate: async (newUser) => {
       setIsAdding(true); // Tampilkan loading saat proses menambahkan user dimulai
    // Snapshot state before mutation
    const snapshot = queryClient.getQueryData(['users']);
    return snapshot;
  },
     onSuccess: (newUser) => {
       console.log('API Response:', newUser); // Cetak respons API
       dispatch({ type: 'users/addUser/fulfilled', payload: newUser }); // Update Redux state
       // queryClient.invalidateQueries({ queryKey: ['users'] }); // Refresh daftar pengguna
       refetch(); // Refresh daftar pengguna
             setIsAdding(false); // Sembunyikan loading setelah sukses
     },
  onError: (error, variables, context) => {
    console.error('Error adding user:', error);
    // Rollback state if mutation fails
    queryClient.setQueryData(['users'], context);
  },
  onSettled: (newUser, error, variables, context) => {
    // Optionally refresh other parts of the application
    console.log('Mutation settled:', { newUser, error });
  },
     onError: (error) => {
       console.error('Error adding user:', error);
     },
   });

  // Mutation to add user
  const handleAddUser = () => {
   const newUser = {
     name: 'New User',
     email: 'newuser@example.com',
   };
   addUserMutation.mutate(newUser); // Trigger useMutation
 };


  useEffect(() => {
    console.log('Calling fetchUsers');
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading) {
      console.log("sukses");
      return <div>Loading...</div>;
    }

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>User Management</h1>
      <button onClick={handleAddUser}
      disabled={isAdding
    }
      >
      {/*disabled={addUserMutation.isLoading */}
        {isAdding ? 'Adding...' : 'Add User Mutation'}
      </button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
