const express = require('express');
const path = require('path');
// handlebars setup
const exphbs = require('express-handlebars');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
// const session = require('express-session');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const sess = {
//     secret: process.env.SECRET,
//     cookie: {},
//     resave: false,
//     saveUninitialized: true,
//     store: new SequelizeStore({
//         db: sequelize
//     })
// };

// // helpers section placeholder //
// const helpers = require('./utils/helpers');
// const hbs = exphbs.create({ helpers });


// middleware
// app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware for static assests in 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// // handlebars set up
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

// turn on routes
app.use(routes);

// connection to db and server
sequelize.sync({ force: true })
  .then(() => {
    console.log("Database connected . . .");
    app.listen(PORT, () => console.log(`NOW LISTENING ON PORT ${PORT}`));
});