/**
 * Mongodb公共文件，统一操作数据库
 */
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27018/sym_pay';

function connect() {
    MongoClient.connect(url, function(err, db) {
        if(err) throw err;
        const dbase = db.db('sym_pay');
    })
}