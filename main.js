/**
 * Created by KlimMalgin on 15.10.2014.
 */
'use strict';

var sqlite3 = require('sqlite3').verbose();
var dbname = "C:\\db/test.db";
var db = new sqlite3.Database(dbname);

db.serialize(function() {
    db.run("CREATE TABLE lorem (info TEXT)");

    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 10; i++) {
        stmt.run("Opsum " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
        console.log(row.id + ": " + row.info);
    });
});

console.log(process.env);
console.log(dbname);

db.close();