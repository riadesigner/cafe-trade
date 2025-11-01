import useFetchAdminClients from '../../../hooks/useFetchAdminClients';
import ClientItem from '../../../components/ClientItem.jsx';
import ErrorMessage from '../../../components/ErrorMessage.jsx';
import Breadcrumb from '../../../components/Breadcrumb.jsx';

export default function AdministratorClientsPage() {
  const { user, clients, nowLoading, errorMessage } = useFetchAdminClients();

  const links = [
    { link: '/', title: 'Главная' },
    { link: '/cp/cafe-administrator', title: 'Кабинет Администратора' },
    { link: '#', title: 'Все клиенты', isActive: true },
  ];

  return (
    <>
      <article>
        <div className="container">
          <div className="section ml-0  mr-0">
            <div className="block">
              <Breadcrumb links={links} />
              <p>
                <small>{user && user.email}</small>
              </p>
            </div>

            <div className="block mb-6 mb-5-mobile">
              <h1 className="title is-size-5">Клиенты</h1>
              {nowLoading ? (
                <p>...loading</p>
              ) : clients && clients.length > 0 ? (
                clients.map((client) => {
                  return (
                    <ClientItem key={client.id} data={client}></ClientItem>
                  );
                })
              ) : (
                <p className="mt-0">
                  <small>Нет зарегистрированных менеджеров</small>
                </p>
              )}
            </div>
          </div>
        </div>

        {errorMessage && <ErrorMessage message={errorMessage} />}
      </article>
    </>
  );
}
