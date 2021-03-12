const express = require('express');
const app = express();
const { Pool } = require("pg");
require('dotenv').config();
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString,
ssl: {
    rejectUnauthorized: false
}});

app.set('port', (process.env.PORT || 5050));
app.use(express.static(__dirname + '/public'));
app.set("views", "views");
app.set("view engine", "ejs");

app.listen(app.get('port'), function() {
    console.log('App running on port', app.get('port'));
});



//------Controller------//
app.post("/guitars", function(req, res) {
    console.log("Received a request for the home page");
    const guitar1 = getGuitar1();
    const guitar2 = getGuitar2();
    const guitar3 = getGuitar3();
    const guitar4 = getGuitar4();
    const guitar5 = getGuitar5();
    const guitar6 = getGuitar6();
    const name = getCurrentLoggedInUserAccount();
    var params = {guitar1: guitar1, guitar2: guitar2, guitar3: guitar3, guitar4: guitar4, guitar5: guitar5, guitar6: guitar6, username: name};

    console.log(name);
    console.log(guitar1);

    res.render("guitars", params);
});



//------Model-------//
function getCurrentLoggedInUserAccount() {
    return "Christopher";
  }

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

    return result.rows;

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