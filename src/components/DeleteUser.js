

  import { persistStore } from 'redux-persist';
  import store from '../redux/store';

  const DeleteUser = () => {

  const persistor = persistStore(store);

  function handleLogout() {
    persistor.pause(); // Hentikan persistensi
    persistor.flush().then(() => {
      persistor.purge(); // Hapus semua data di storage
      console.log("Local storage cleared!");
    });
  }
  return (
    <div>
    <div onClick={handleLogout}>hapus</div>
    </div>
  );
};

export default DeleteUser;
