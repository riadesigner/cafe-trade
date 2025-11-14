import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../utils/api.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function useFetchClientAdmin() {
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [deals, setDeals] = useState([]);
  const [userInputCoins, setUserInputCoins] = useState(100);
  const [nowLoading, setNowLoading] = useState(true);
  const [nowLoadingDeals, setNowLoadingDeals] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [showToConfirmDeleting, setShowToConfirmDeleting] = useState(false);
  const [coinsData, setCoinsData] = useState({
    totalCoins: 0,
    totalPurchases: 0,
    totalSpendings: 0,
  });
  const [currentExchangeRate, setCurrentExchangeRate] = useState(0);
  const { logout } = useAuth();

  const navigate = useNavigate();

  const hdlDeleteAccount = (e) => {
    e.preventDefault();
    setShowToConfirmDeleting(true);
  };

  const dologout = () => {
    logout();
    navigate('/');
  };

  const hdlDeleteAccountConfirmed = async () => {
    try {
      const response = await api.delete('/users/clients/me');
      if (response.data.success) {
        // выйти из аккаунта и перейти на главную
        dologout();
      } else {
        setErrorMessage('[2] невозможно удалить пользователя');
      }
    } catch (err) {
      setErrorMessage('[1] невозможно удалить пользователя');
      console.error('невозможно удалить пользователя', err);
    }
  };

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
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }

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
  }, [navigate, location]);

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
    hdlDeleteAccount,
    showToConfirmDeleting,
    hdlDeleteAccountConfirmed,
  };
}
