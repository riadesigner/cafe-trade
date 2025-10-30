import ErrorMessage from '../../../components/ErrorMessage.jsx';
import Breadcrumb from '../../../components/Breadcrumb.jsx';
import { Link } from 'react-router-dom';

export default function ClientPurchasingFailPage() {
  const links = [
    { link: '/', title: 'Главная' },
    { link: '/cp/cafe-client', title: 'Кабинет клиента' },
    { link: '#', title: 'Ошибка при оплате', isActive: true },
  ];

  return (
    <>
      <div className="container">
        <div className="section mr-0 ml-0">
          <div>
            <h1 className="title is-size-4 is-size-5-mobile">
              Покупка Wall Street Монет
            </h1>
          </div>

          <Breadcrumb links={links} />

          <p>&nbsp;</p>

          <article>
            <div className="box">
              <h2 className="title is-size-4 mb-5">Ошибка при оплате</h2>
              <div className="columns">
                <div className="column is-6">
                  <p>
                    Произошла непредвиденная ошибка при покупке WSM. Попробуйте
                    попытку позже.
                  </p>
                  <Link to="/cp/cafe-client">
                    <button className="button mb-4 is-primary">
                      Вернуться в личный кабинет
                    </button>
                  </Link>
                  <br />
                  <Link to="/">
                    <button className="button mb-4">Перейти на главную</button>
                  </Link>
                  <br />
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
