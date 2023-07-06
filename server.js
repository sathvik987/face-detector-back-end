const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: process.env.dbUrl || ""
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('it is working') });

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });

app.put('/image', (req, res) => { image.handleImage(req, res, db) });

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(process.env.PORT || 3001, () => {
    if (process.env.PORT) {
        console.log(`app is running at ${process.env.PORT}`);
    } else {
        console.log(`app is running at 3001`);
    }
});











