const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())

mongoose.connect(
  'mongodb://test:test123@ds131914.mlab.com:31914/graphql',
  { useNewUrlParser: true }
)

mongoose.connection.once('open', () => {
  console.log('connected to database');
})

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }))

app.listen(4000, () => {
  console.log('App is running on 4000 ...')
})