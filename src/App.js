import React,{useEffect} from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store, { persistor } from './redux/store';
import UserManagement from './components/UserManagement';
import DeleteUser from './components/DeleteUser';

const queryClient = new QueryClient();

function App() {
//   useEffect(() => {
//   const clearPersistedState = async () => {
//     try {
//       await store.__PERSISTOR__.purge(); // Hapus seluruh state persist
//       console.log('Persisted state has been cleared.');
//     } catch (error) {
//       console.error('Failed to clear persisted state:', error);
//     }
//   };
//
//   clearPersistedState();
// }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={<div>Loading persisted state...</div>} persistor={persistor}>
          <UserManagement />
          {/*<DeleteUser />*/}
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
