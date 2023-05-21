const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {WebSocket, WebSocketServer} = require('ws');
const http = require('http');
const uuidv4 = require('uuid').v4;
const connectDB = require('./config/db') 
const userSchema = require('./BLL/userBLL');
const groupSchema = require('./BLL/groupBLL');
const chatSchema = require('./BLL/chatBLL');
const cors = require('cors');
const app = express();

const server = http.createServer();
const wsServer = new WebSocketServer({server});
server.listen(6000, () => {
    console.log('WebSocket Server is listening to port 6000');
})
app.use(cors());
connectDB();

app.use('/graphql_user', graphqlHTTP({schema: userSchema, graphiql: true}));
app.use('/graphql_group', graphqlHTTP({schema: groupSchema, graphiql: true}));
app.use('/graphql_chat', graphqlHTTP({schema: chatSchema, graphiql: true}));
app.listen(5000, () => {
    console.log("🚀 Server is running at http://localhost:5000 🚀");
});