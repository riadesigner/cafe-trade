require('dotenv').config();

const express = require('express');
const configureSessions = require('./config/sessions');
const configurePassport = require('./config/passport');
const configureCors = require('./config/cors');
const configureAdmins = require('./config/admin');
const requestLogger = require('./middleware/requestLogger');
const configureDataBase = require('./config/db');
const { sendError } = require('./middleware/utils');
const {
  authErrorHandler,
  apiErrorHandler,
  fallbackErrorHandler,
} = require('./middleware/errorHandlers');

const path = require('path');
const PUBLIC_PATH = path.join(__dirname + '/public');

// -------------------
//      APP INIT
// -------------------
const app = express();

configureDataBase();
configureSessions(app);
configurePassport(app);
configureCors(app);
configureAdmins();

app.use('/public', express.static(PUBLIC_PATH));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// ------------
//    ROUTS
// ------------
app.use('/auth', require('./auth/auth.routes')); // auth через яндекс и mailru
app.use('/api', require('./auth/auth-api.routes')); // jwt
app.use('/api', require('./users/users-api.routes')); // пользователи

app.get('/', (req, res) => {
  const user = req.user;
  res.render('index', { user });
});

// 404 — если ни один маршрут не сработал
app.use(require('./middleware/error404'));

// Ошибка для /auth
app.use('/auth', authErrorHandler);

// Ошибка для /api
app.use('/api', apiErrorHandler(sendError));

// Фолбэк
app.use(fallbackErrorHandler);

const server = app.listen(process.env.PORT, () => {
  console.log(`Сервер запущен на http://localhost:${process.env.PORT}`);
});

server.on('error', (error) => {
  console.error('Server error:', error);
});

// Автоматический перезапуск при критических ошибках
// process.on('SIGTERM', () => {
//   console.log('SIGTERM received');
//   server.close(() => {
//     console.log('Process terminated');
//   });
// });
