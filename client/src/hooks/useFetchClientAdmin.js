import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import api from '../utils/api.jsx';

export default function useFetchClientAdmin() {
  const [user, setUser] = useState(null);
  const [deals, setDeals] = useState([]);
  const [userInputCoins, setUserInputCoins] = useState(0);
  const [nowLoading, setNowLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [coinsData, setCoinsData] = useState({
    totalCoins: 0,
    totalPurchases: 0,
    totalSpendings: 0,
  });

  const navigate = useNavigate();

  const fetchDeals = async () => {
    try {
      const response = await api.get('/deals/me');
      if (response.data.success) {
        setDeals(response.data.deals);
      }
    } catch (err) {
      setErrorMessage('Ошибка загрузки данных о покупках');
      console.error('Ошибка загрузки данных о покупках', err);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await api.get('/users/me');
      if (response.data.success) {
        setUser(response.data.user);
        setCoinsData(response.data.coinsData);
        await fetchDeals();
        setNowLoading(false);
      }
    } catch (err) {
      setErrorMessage('Ошибка загрузки профиля');
      console.error('Ошибка загрузки профиля', err);
      navigate('/');
    }
  };

  const hdlBuy = async (e) => {
    e.preventDefault();
    let amount = parseInt(userInputCoins, 10);
    if (amount === 0 || amount < 0) return;

    try {
      const response = await api.put(`/deals/me/${amount}`);
      if (response && response.data.success) {
        setDeals(response.data.deals);
        setCoinsData(response.data.updatedCoinsData);
      }
    } catch (err) {
      setErrorMessage('Ошибка покупки WSM');
      console.error('Ошибка покупки WSM', err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [navigate]);

  return {
    user,
    deals,
    coinsData,
    nowLoading,
    errorMessage,
    hdlBuy,
    userInputCoins,
    setUserInputCoins,
  };
}
