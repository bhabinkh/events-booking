require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql').graphqlHTTP

const graphQLSchema = require('./graphql/schemas/index')
const graphQLResolvers = require('./graphql/resolvers/index')
const isAuth = require('./middleware/isAuth')

const app = express()
app.use(bodyParser.json())

const connectDB = require('./db/db_connection')
const port = 4000

app.use(isAuth)

app.use('/graphql', graphqlHttp({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true
}))

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening in port: ${port}.... `)
        })
    } catch (err) {
        console.log(err, `Error in connecting mongodb....`)
    }
}

start()
