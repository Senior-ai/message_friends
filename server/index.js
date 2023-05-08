const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const connectDB = require('./config/db') 
const userSchema = require('./BLL/userBLL');
const groupSchema = require('./BLL/groupBLL');
const cors = require('cors');
const app = express();

app.use(cors());
connectDB();

app.use('/graphql_user', graphqlHTTP({schema: userSchema, graphiql: true}));
app.use('/graphql_group', graphqlHTTP({schema: groupSchema, graphiql: true}));
//app.use('/graphql_msg', graphqlHTTP({schema: messageSchema, graphiql: true}));
app.listen(5000, () => {
    console.log("🚀 Server is running at http://localhost:5000 🚀");
});