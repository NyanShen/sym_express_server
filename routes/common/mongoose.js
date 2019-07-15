/**
 * Mongodb公共文件，统一操作数据库
 */
const mongoose = require('mongoose');
const url = 'mongodb://localhost/sym_pay';
mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Successful connection to " + url)
});

module.exports = mongoose;