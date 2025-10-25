import React, { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../utils/api.jsx';

export default function LoginPage() {
  const hdlYandexLogin = () => {
    window.location.href = `/auth/yandex`;
  };

  const hdlMailruLogin = () => {
    window.location.href = `/auth/mailru`;
  };

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  searchParams.get('error');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/auth/check-auth');
        if (response.data.isAuthenticated) {
          // console.log(' готов перейти в личный кабинет');
        }
      } catch (err) {
        console.error(
          'Пользователь не аутентифицирован. Необходимо заново войти',
          err
        );
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <>
      <div className="section container is-max-desktop mb-6">
        <article>
          <div className="box">
            <h2 className="title has-text-centered mt-6 mb-6 is-size-5">
              Выберите способ входа:
            </h2>

            <div className="has-text-centered mb-6">
              <button
                className="button is-large is-regular-mobile is-primary mb-2"
                onClick={hdlYandexLogin}
              >
                Войти через Яндекс
              </button>

              <br />

              <button
                className="button is-large is-regular-mobile is-primary"
                onClick={hdlMailruLogin}
              >
                Войти через Mail.ru
              </button>
            </div>

            <div className="block">
              <p className="has-text-centered is-size-7-mobile">
                <i className="fa-solid fa-check"></i> &nbsp; Я согласен с{' '}
                <Link to="/useragree">
                  политикой обработки персональных данных
                </Link>
              </p>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
