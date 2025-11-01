import { useEffect, useState } from 'react';
import api from '../utils/api.jsx';

export default function useFetchAdmin() {
  const [user, setUser] = useState(null);
  const [clientsCount, setClientsCount] = useState(0);
  const [nowLoading, setNowLoading] = useState(true);
  const [nowSaving, setNowSaving] = useState(false);
  const [nowDeleting, setNowDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [newManagerName, setNewManagerName] = useState('');
  const [newManagerEmail, setNewManagerEmail] = useState('');
  const [errorMessageNewManager, setErrorMessageNewManager] = useState('');
  const [managers, setManagers] = useState([]);

  const hdlDeleteManager = async (e, email) => {
    e.preventDefault();
    setErrorMessageNewManager('');
    setErrorMessage('');
    setNowDeleting(true);
    const data = { email };

    try {
      const response = await api.delete('/users/manager', { data });
      if (response.data.success) {
        setManagers(response.data.managers);
      } else {
        setErrorMessage('Менеджер не удаляется');
      }
    } catch (err) {
      setErrorMessage('Менеджер не удаляется');
      console.error('Менеджер не удаляется', err);
    }
    setNewManagerName('');
    setNewManagerEmail('');
    setNowDeleting(false);
  };

  const addNewManager = async (e) => {
    e.preventDefault();
    setErrorMessageNewManager('');
    setErrorMessage('');
    let name = newManagerName.trim();
    let email = newManagerEmail.trim();
    if (name === '' || email === '') {
      setErrorMessageNewManager('все поля обязательны для заполнения');
      return;
    }
    // adding new manager
    setNowSaving(true);
    const data = { email, name };
    try {
      const response = await api.put('/users/manager', data);
      if (response.data.success) {
        setManagers(response.data.managers);
      } else {
        setErrorMessage('Менеджер не добавлен');
      }
    } catch (err) {
      setErrorMessage('Менеджер не добавлен');
      console.error('Менеджер не добавлен', err);
    }
    setNewManagerName('');
    setNewManagerEmail('');
    setNowSaving(false);
  };

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await api.get('/users/managers');
        if (response.data.success) {
          setManagers(response.data.managers);
        } else {
          setErrorMessage('Список менеджеров не загружен');
        }
      } catch (err) {
        setErrorMessage('Список менеджеров не загружен');
        console.error('Список менеджеров не загружен', err);
      }
    };

    const fetchClientsCount = async () => {
      try {
        const response = await api.get('/users/clients/count');
        if (response.data.success) {
          setClientsCount(response.data.clientsCount);
        } else {
          setErrorMessage('Количество клиентов не загружено');
        }
      } catch (err) {
        setErrorMessage('Количество клиентов не загружено');
        console.error('Количество клиентов не загружено', err);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await api.get('/users/me');
        if (response.data.success) {
          setUser(response.data.user);
          await fetchManagers();
          await fetchClientsCount();
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
    managers,
    clientsCount,
    nowLoading,
    nowSaving,
    nowDeleting,
    addNewManager,
    hdlDeleteManager,
    newManagerName,
    setNewManagerName,
    newManagerEmail,
    setNewManagerEmail,
    errorMessage,
    errorMessageNewManager,
  };
}
