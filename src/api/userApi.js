export const fetchUsersApi = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) throw new Error('Error fetching users');
  // console.log('Fetched users:', await response.json());
  return response.json();
};


export const addUserApi = async (user) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error('Error adding user');
  // console.log('User added:', await response.json());
  return response.json();
};
