import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import api from '../../utils/api.jsx';

export default function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  // const checkUser

  useEffect(() => {

    const token = searchParams.get('token');

    if (token) {
      login(token);
      window.history.replaceState({}, '', '/'); // Очищаем URL
      console.log('token = ', token);
      

      const checkAuth = async () => {
        const response = await api.get('/auth/check-auth');
        // console.log('response', response);
        if (response.data.isAuthenticated) {
          const user = response.data.user;

          switch (user.role) {
            case 'client':
              navigate('/cp/client');
              break;
            case 'manager':
              navigate('/cp/manager');
              break;
            case 'administrator':              
              navigate('/cp/administrator');
              break;               
            default:
              console.log('роль не определена')
              navigate('/');
          }
        } else {
          console.log('пользователь не аутентифицирован')
          navigate('/');
        }
      };
      // checkAuth();

    } else {
      navigate('/login'); // Если токена нет
    }
  });

  return <div>Processing authentication...</div>;
}
