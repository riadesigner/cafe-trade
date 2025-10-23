import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import api from '../utils/api.jsx';

export default function useFetchClientAdmin() {
  const [user, setUser] = useState(null);
  const [nowLoading, setNowLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/users/me');

        if (response.data.success) {
          const usr = response.data.user;
          if (usr) {
            setUser(usr);
            setNowLoading(false);
          }
        }
      } catch (err) {
        setErrorMessage('Ошибка загрузки профиля');
        console.error('Ошибка загрузки профиля', err);
        navigate('/');
      }
    };

    void fetchUser();
  }, [navigate]);

  return {
    user,
    nowLoading,
    errorMessage,
  };
}
