require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql').graphqlHTTP

const graphQLSchema = require('./graphql/schemas/index')
const graphQLResolvers = require('./graphql/resolvers/index')
const isAuth = require('./middleware/isAuth')
const cors = require('cors')


const app = express()
app.use(bodyParser.json())

const connectDB = require('./db/db_connection')
const port = 5005

app.use(cors())

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     if (req.method === 'OPTIONS') {
//         return res.sendStatus(200);
//     }
//     next();
// });

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
