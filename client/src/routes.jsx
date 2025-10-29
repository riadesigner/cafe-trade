// --------------------
//    PUBLIC PAGES
// --------------------

import {
  AuthCallbackPage,
  AboutPage,
  ErrorPage,
  HomePage,
  LoginPage,
} from './pages/index.js';

// --------------------
//    PRIVATE PAGES
// --------------------
import {
  ClientAdminPage,
  ClientPurchasingPage,
  ManagerAdminPage,
  AdministratorPage,
} from './pages/private/index.js';

import Entry from './Entry.jsx';

const routes = [
  {
    path: '/',
    element: <Entry />,
    errorElement: <ErrorPage />, // Обработка ошибок маршрутизации
    children: [
      { index: true, element: <HomePage /> }, // Главная страница
      { path: 'about', element: <AboutPage /> }, // /about
      { path: 'login', element: <LoginPage /> }, // /вход

      { path: 'auth-callback', Component: AuthCallbackPage },

      // private pages
      { path: 'cp/cafe-client', element: <ClientAdminPage /> }, // /личный кабинет клиента
      {
        path: 'cp/cafe-client/purchasing/:amount',
        element: <ClientPurchasingPage />,
      }, // /страница покупки wsm
      { path: 'cp/cafe-manager', element: <ManagerAdminPage /> }, // /личный кабинет менеджера
      { path: 'cp/cafe-administrator', element: <AdministratorPage /> }, // /личный кабинет администратора
    ],
  },
];

export default routes;
