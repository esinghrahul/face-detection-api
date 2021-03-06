const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const register = require('./controllers/register')
const signIn = require('./controllers/signin')
const profile = require('./controllers/profile')
const image= require('./controllers/image')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
/*
const db = knex({
        client: 'pg',
        connection: {
          connectString : process.env.DATABASE_URI,
          ssl: true
        }
})
*/

const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res)=> {
    res.send('Hello there!')
})

app.post('/signin', (req,res)=> {signIn.handleSignIn(req, res, db, bcrypt)})

app.post('/register', (req, res)=> {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res)=> {profile.handleProfile(req, res, db)})

app.put('/image', (req, res)=> {image.handleImage(req, res, db)})

app.post('/imageUrl', (req, res)=> {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 4000, ()=> {
    console.log(`app is running on port ${process.env.PORT}`)
})