import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '../utils/api.jsx';

export default function useFetchClientAdmin() {
  const { amount } = useParams();

  // const [user, setUser] = useState(null);
  const [nowLoading, setNowLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentExchangeRate, setCurrentExchangeRate] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [WSM_amount, setWSM_amount] = useState(0);

  const calcPrice = () => {
    const wsm = WSM_amount;
    const rate = currentExchangeRate;
    return Math.round((parseInt(wsm, 10) * parseInt(rate, 10)) / 100);
  };

  const navigate = useNavigate();

  const hdlConfirm = async (e) => {
    e.preventDefault();

    // let amount = parseInt(userInputCoins, 10);
    // if (amount === 0 || amount < 0) return;

    navigate('/cp/cafe-client/purchasing/success');

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

  const fetchCurrentRate = async () => {
    try {
      const response = await api.get('/exchange-rates/current');
      if (response.data.success) {
        const rate = response.data.currentRate.rate;
        setCurrentExchangeRate(rate);
      }
    } catch (err) {
      setErrorMessage('Ошибка загрузки текущего курса');
      console.error('Ошибка загрузки текущего курса', err);
    }
  };

  useEffect(() => {
    setWSM_amount(Math.max(100, parseInt(amount, 10)));

    const checkAuth = async () => {
      const response = await api.get('/auth/check-auth');
      if (response.data.isAuthenticated) {
        // setUser(response.data.user);
        await fetchCurrentRate();
        setCurrentPrice(calcPrice());
        setNowLoading(false);
      } else {
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate, currentExchangeRate, amount]);

  return {
    nowLoading,
    errorMessage,
    hdlConfirm,
    currentExchangeRate,
    currentPrice,
    WSM_amount,
  };
}
