const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path : '.env'})
const app = require('./app');

const DatabaseConnection = async () => {
    mongoose.connect(process.env.DATABASE);
    console.log("Database is Connected")
}
DatabaseConnection();

const port = process.env.PORT || 3010;

const host  = process.env.HOST || '127.0.0.1' ;

app.listen(port, host , () => {
    console.log(host);
    console.log(`${port} is running`);
});