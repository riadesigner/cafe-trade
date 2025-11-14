import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../utils/api.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { getPayloads } from '../utils/payloads.jsx';

export default function useFetchMainPage() {
  const [currentRole, setCurrentRole] = useState('');
  const [nowLoading, setNowLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorClientOnly, setErrorClientOnly] = useState(false);
  const [currentExchangeRate, setCurrentExchangeRate] = useState(0);
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

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

  const hdlGoToBuy = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      if (currentRole !== 'client') {
        setErrorClientOnly(true);
      } else {
        navigate(`/cp/cafe-client#buywsm`);
      }
    } else {
      navigate(`/login`);
    }
  };

  useEffect(() => {
    const payloads = getPayloads();
    payloads && setCurrentRole(payloads.role);

    const fetchHomePage = async () => {
      setNowLoading(true);
      await fetchCurrentRate();
      setNowLoading(false);
    };
    fetchHomePage();
  }, []);

  return {
    nowLoading,
    errorClientOnly,
    errorMessage,
    hdlGoToBuy,
    currentExchangeRate,
  };
}
