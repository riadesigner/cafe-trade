import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../utils/api.jsx';

export default function useFetchAdmin() {
  const [user, setUser] = useState(null);
  const [nowLoading, setNowLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [deals, setDeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeals = async (managerId) => {
      try {
        const response = await api.get(`/deals/bymanager/${managerId}`);
        if (response.data.success) {
          setDeals(response.data.deals);
        } else {
          setErrorMessage('Список продаж не загружен');
        }
      } catch (err) {
        setErrorMessage('Список продаж не загружен');
        console.error('Список продаж не загружен', err);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await api.get('/users/me');
        if (response.data.success) {
          setUser(response.data.user);
          const managerId = response.data.user.id;
          await fetchDeals(managerId);
        } else {
          setErrorMessage('Ошибка [1] загрузки профиля');
        }
        setNowLoading(false);
      } catch (err) {
        if (err.status == 401) {
          navigate('/login');
        }
      }
    };

    fetchUser();
  }, [navigate]);

  return {
    user,
    deals,
    nowLoading,
    errorMessage,
  };
}
