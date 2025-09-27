import {
  AboutPage,
  ErrorPage,
  HomePage,
  LoginPage,
} from './pages/index.js';

// --------------------
//    PRIVATE PAGES
// --------------------
// import {
//   ClientPage,
//   AdminPage,
//   ManagerPage,
// } from './pages/private/index.js';

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

      // private pages
      // { path: 'cp/client', element: <ClientPage /> }, // /личный кабинет клиента
      // { path: 'cp/cafe-admin', element: <AdminPage /> }, // /личный кабинет администратора
      // { path: 'cp/cafe-manager', element: <ManagerPage /> }, // /личный кабинет менеджера

    ],
  },
];

export default routes;
