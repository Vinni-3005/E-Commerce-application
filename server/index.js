require('dotenv').config();
const passport = require('passport');
const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const helmet = require('helmet');
const keys = require('./config/keys');
const routes = require('./routes');
const socket = require('./socket');
const setupDB = require('./utils/db');

const { port } = keys;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: true
  })
);

app.use ( (req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})

const corsOptions = {
  origin: "http://localhost:3001",
};

app.use(cors(corsOptions));

app.use(cors({
  origin: "http://localhost:3001", //allow request from frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true //if you are sending cookies or session info
}));

setupDB();
require('./config/passport')(app);
app.use(passport.initialize());

const authRoutes = require('./routes/api/auth');  // Importing authentication routes
app.use('/api/auth', authRoutes); 

const brandRoutes = require('./routes/api/brand');
app.use('/api', brandRoutes);         //importing brand routes

const productRoutes = require('./routes/api/product');
app.use('/api', productRoutes);          //impoting product api's

const roleRoutes = require('./routes/api/roles');
app.use('/api', roleRoutes);    //importing role routes



app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});
app.use(routes);

const server = app.listen(port, () => {
  console.log(
    `${chalk.green('✓')} ${chalk.blue(
      `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
    )}`
  );
});

socket(server);
