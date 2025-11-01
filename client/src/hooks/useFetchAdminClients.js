import { useEffect, useState } from 'react';
import api from '../utils/api.jsx';

export default function useFetchAdminClients() {
  const [user, setUser] = useState(null);
  const [nowLoading, setNowLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchAllClients = async () => {
      try {
        const response = await api.get('/users/clients');
        if (response.data.success) {
          setClients(response.data.clients);
        } else {
          setErrorMessage('Список клиентов не загружен');
        }
      } catch (err) {
        setErrorMessage('Список клиентов не загружен');
        console.error('Список клиентов не загружен', err);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await api.get('/users/me');
        if (response.data.success) {
          setUser(response.data.user);
          await fetchAllClients();
        } else {
          setErrorMessage('Ошибка [1] загрузки профиля');
        }
        setNowLoading(false);
      } catch (err) {
        setErrorMessage('Ошибка [2] загрузки профиля');
        console.error('Ошибка загрузки профиля', err);
        setNowLoading(false);
      }
    };

    fetchUser();
  }, []);

  return {
    user,
    clients,
    nowLoading,
    errorMessage,
  };
}
