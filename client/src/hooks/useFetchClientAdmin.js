import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import api from '../utils/api.jsx';

export default function useFetchClientAdmin() {
  const [user, setUser] = useState(null);
  const [deals, setDeals] = useState([]);
  const [userInputCoins, setUserInputCoins] = useState(100);
  const [nowLoading, setNowLoading] = useState(true);
  const [nowLoadingDeals, setNowLoadingDeals] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [coinsData, setCoinsData] = useState({
    totalCoins: 0,
    totalPurchases: 0,
    totalSpendings: 0,
  });
  const [currentExchangeRate, setCurrentExchangeRate] = useState(0);

  const navigate = useNavigate();

  const fetchDeals = async () => {
    try {
      const response = await api.get('/deals/me');
      if (response.data.success) {
        setDeals(response.data.deals);
      } else {
        setErrorMessage('Ошибка [2] загрузки данных о покупках');
      }
      setNowLoadingDeals(false);
    } catch (err) {
      setErrorMessage('Ошибка [1] загрузки данных о покупках');
      console.error('Ошибка загрузки данных о покупках', err);
    }
  };

  const fetchCurrentRate = async () => {
    try {
      const response = await api.get('/exchange-rates/current');
      if (response.data.success) {
        setCurrentExchangeRate(response.data.currentRate.rate);
      }
    } catch (err) {
      setErrorMessage('Ошибка загрузки текущего курса');
      console.error('Ошибка загрузки текущего курса', err);
    }
  };

  const hdlBuy = async (e) => {
    e.preventDefault();
    let amount = parseInt(userInputCoins, 10);
    if (amount === 0 || amount < 0) return;

    navigate(`/cp/cafe-client/purchasing/${amount}`);

    // try {
    //   const response = await api.put(`/deals/me/${amount}`);
    //   if (response && response.data.success) {
    //     setDeals(response.data.deals);
    //     setCoinsData(response.data.updatedCoinsData);
    //   }
    // } catch (err) {
    //   setErrorMessage('Ошибка покупки WSM');
    //   console.error('Ошибка покупки WSM', err);
    // }
  };

  useEffect(() => {
    setCurrentExchangeRate(0);

    const fetchUser = async () => {
      try {
        const response = await api.get('/users/me');
        if (response.data.success) {
          setUser(response.data.user);
          setCoinsData(response.data.coinsData);
          await fetchCurrentRate();
          setNowLoading(false);
          await fetchDeals();
        }
      } catch (err) {
        setErrorMessage('Ошибка загрузки профиля');
        console.error('Ошибка загрузки профиля', err);
        navigate('/');
      }
    };

    fetchUser();
  }, [navigate]);

  return {
    user,
    deals,
    coinsData,
    nowLoading,
    nowLoadingDeals,
    errorMessage,
    hdlBuy,
    userInputCoins,
    setUserInputCoins,
    currentExchangeRate,
  };
}
