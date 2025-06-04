const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const messageRoutes = require('./routes/message');
const subscriberRoute = require('./routes/subscriber');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');

dotenv.config();
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));


app.use('/', messageRoutes);
app.use('/', subscriberRoute);

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));