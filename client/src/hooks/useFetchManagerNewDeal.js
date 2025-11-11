import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../utils/api.jsx';

export default function useFetchAdmin() {
  const [user, setUser] = useState(null);
  const [nowSearching, setNowSearching] = useState(false);
  const [nowLoading, setNowLoading] = useState(false);
  const [clientPhone, setClientPhone] = useState('');
  const [foundClients, setFoundClients] = useState([]);
  const [currentClientId, setCurrentClientId] = useState(null);
  const [currentClientTotalCoins, setCurrentClientTotalCoins] = useState(0);
  const [managerInputCoins, setManagerInputCoins] = useState(100);
  const [startSearching, setStartSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const hdlChangeClientPhone = (e, value) => {
    if (value.length < 11) {
      setClientPhone(value);
      setFoundClients([]);
    }
  };

  const hdlSetCurrentClient = async (e, clientId) => {
    e.preventDefault();
    // loading full info abou user
    const clients = foundClients.filter((u) => u.id === clientId);
    setFoundClients(clients);
    setNowLoading(true);

    try {
      const response = await api.get(`/users/clients/${clientId}`);
      if (response.data.success) {
        const client = response.data.client;
        const coinsData = response.data.coinsData;
        client.totalCoins = coinsData.totalCoins;
        setCurrentClientTotalCoins(coinsData.totalCoins);
        setFoundClients([client]);
        setCurrentClientId(clientId);
      } else {
        setFoundClients([]);
      }
      setNowLoading(false);
    } catch {
      setFoundClients([]);
      setNowLoading(false);
    }
  };

  const hdlToSell = async (e) => {
    e.preventDefault();
    const mc = parseInt(managerInputCoins, 10);
    const cs = parseInt(currentClientTotalCoins, 10);
    if (mc > cs) {
      // console.log("не достаточно средств на счету");
      setErrorMessage('не достаточно средств на счету');
    } else {
      // try{
      // }catch{
      // }
    }
  };

  const hdlChangeManagerInputs = (value) => {
    if (value.length < 5) {
      setManagerInputCoins(value);
    }
  };

  const hdlSearchClients = async (e) => {
    e.preventDefault();
    const phone = clientPhone.trim();
    if (!phone) {
      return;
    } else {
      setStartSearching(true);
      setNowSearching(true);
      setNowLoading(false);
      setCurrentClientId(null);
      setFoundClients([]);
      setCurrentClientTotalCoins(0);
      try {
        const response = await api.get(`/users/clients-by-phone/${phone}`);
        if (response.data.success) {
          const clients = response.data.clients;
          setFoundClients(clients);
        } else {
          setFoundClients([]);
        }
        setNowSearching(false);
      } catch {
        setFoundClients([]);
        setNowSearching(false);
      }
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/users/me');
        if (response.data.success) {
          setUser(response.data.user);
          // const managerId = response.data.user.id
        } else {
          setErrorMessage('Ошибка [1] загрузки профиля');
        }
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
    clientPhone,
    hdlChangeClientPhone,
    hdlSearchClients,
    hdlToSell,
    hdlSetCurrentClient,
    hdlChangeManagerInputs,
    managerInputCoins,
    foundClients,
    currentClientId,
    nowSearching,
    nowLoading,
    startSearching,
    errorMessage,
  };
}
