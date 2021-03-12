const express = require('express');
const app = express();
const { Pool } = require("pg");
require('dotenv').config();
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString,
ssl: {
    rejectUnauthorized: false
}});

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set("views", "views");
app.set("view engine", "ejs");

app.listen(app.get('port'), function() {
    console.log('App running on port', app.get('port'));
});



//------Controller------//
app.post("/guitars", function(req, res) {
    console.log("Received a request for the home page");
    guitar1 = getGuitar1();
    guitar2 = getGuitar2();
    guitar3 = getGuitar3();
    guitar4 = getGuitar4();
    guitar5 = getGuitar5();
    guitar6 = getGuitar6();
    var params = {guitar1: guitar1, guitar2: guitar2, guitar3: guitar3, guitar4: guitar4, guitar5: guitar5, guitar6: guitar6};

    // console.log(guitar1);

    res.render("guitars", params);
});



//------Model-------//
function getGuitar1() {
var sql = "SELECT * FROM guitar WHERE guitarid = 1";

pool.query(sql, function(err, result) {
    // If an error occurred...
    if (err) {
        console.log("Error in query: ")
        console.log(err);
    }

    // Log this to the console for debugging purposes.
    console.log("Back from DB with result:");
    console.log(result.rows);

    return result;

}); 
}  

function getGuitar2() {
    var sql = "SELECT * FROM guitar WHERE guitarid = 2";
    
    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
    
        // Log this to the console for debugging purposes.
        console.log("Back from DB with result:");
        console.log(result.rows);
    
        return result.rows;

    }); 
    } 

    function getGuitar3() {
        var sql = "SELECT * FROM guitar WHERE guitarid = 3";
        
        pool.query(sql, function(err, result) {
            // If an error occurred...
            if (err) {
                console.log("Error in query: ")
                console.log(err);
            }
        
            // Log this to the console for debugging purposes.
            console.log("Back from DB with result:");
            console.log(result.rows);
        
            return result.rows;

        }); 
        } 
        
        function getGuitar4() {
            var sql = "SELECT * FROM guitar WHERE guitarid = 4";
            
            pool.query(sql, function(err, result) {
                // If an error occurred...
                if (err) {
                    console.log("Error in query: ")
                    console.log(err);
                }
            
                // Log this to the console for debugging purposes.
                console.log("Back from DB with result:");
                console.log(result.rows);
            
                return result.rows;

            }); 
            }  

            function getGuitar5() {
                var sql = "SELECT * FROM guitar WHERE guitarid = 5";
                
                pool.query(sql, function(err, result) {
                    // If an error occurred...
                    if (err) {
                        console.log("Error in query: ")
                        console.log(err);
                    }
                
                    // Log this to the console for debugging purposes.
                    console.log("Back from DB with result:");
                    console.log(result.rows);
                
                    return result.rows;
                
                }); 
                }  

                function getGuitar6() {
                    var sql = "SELECT * FROM guitar WHERE guitarid = 6";
                    
                    pool.query(sql, function(err, result) {
                        // If an error occurred...
                        if (err) {
                            console.log("Error in query: ")
                            console.log(err);
                        }
                    
                        // Log this to the console for debugging purposes.
                        console.log("Back from DB with result:");
                        console.log(result.rows);
                    
                        return result.rows;
                    
                    }); 
                    }  