const express = require('express');
const app = express();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const { Pool } = require("pg");
require('dotenv').config();
const bodyParser = require('body-parser');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const xhr = new XMLHttpRequest();
const session = require('express-session');
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// global.document = new JSDOM(html).window.document;
const connectionString = process.env.DATABASE_URL;
const pool = new Pool(
    {connectionString: connectionString,
      ssl: {
        rejectUnauthorized: false 
      }
});

app.set('port', (process.env.PORT || 5050));
app.use(express.static(__dirname + '/public'));
app.set("views", "views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true })); 

app.listen(app.get('port'), function() {
    console.log('App running on port', app.get('port'));
});


//------Controller------//
app.post("/guitars", function(req, res) {
    console.log("Received a request for the guitar page");
     getGuitar(res);


});



app.get("/orders", function(req, res) {
    console.log("Received a request for the order page");
    getCustomerOrder(res);
})

app.get("/customer", function(req, res) {
    console.log("Received a request for the customer page");
    getCustomers(res);
})

app.post("/orders", function(req, res) {
    console.log("Received a request for the post orders page");
    var customerName = req.body.customer;
    // var customerOrders = getCustomerOrder(customerName);
  
    console.log("Customer number is " + customerName);

    // renderHomePage(name);
    res.render("orders");
  })

app.post("/addOrder", function(req, res) {
    console.log("Received a request for the add order page");
    var customer = req.body.customer;
    var guitar = req.body.guitar;
    var price = req.body.price;
    var guitarid = req.body.guitarid;
    console.log(customer, guitarid);
    addGuitar(customer, guitarid);

    var params = {guitar: guitar, price: price, customer: customer};

    res.render("addOrder", params);
})

app.post("/orderDetail", function(req, res) {
    console.log("Received a request to display orders");
    var userid = req.body.userid;
    // let userid = req.query.userid;
    console.log(userid);
    guitarOrders(res, userid);
})

app.post("/updateCustomer", function(req, res) {
    console.log("Received a request to update customer");
    let userid = req.body.userid;
    let newCustomer = req.body.newCustomer;
    modifyCustomer(res, userid, newCustomer);
})


app.post("/deleteOrder", function(req, res) {
    console.log("Received a request to delete order");
    let orderid = req.body.orderid;
    deleteOrders(res, orderid);
})


//------Model-------//
// function getCurrentLoggedInUserAccount() {
//     return "Christopher";
//   }


function getGuitar(res) {
var sql = "SELECT * FROM guitar WHERE guitarid <= 6";
var sql1 = "SELECT * FROM customer WHERE userid <= 4";

pool.query(sql, function(err, result) {
    // If an error occurred...
    if (err) {
        console.log("Error in query: ");
        console.log(err);
    }

    // Log this to the console for debugging purposes.
    console.log("Back from DB with result:");
    console.log(sql);
    console.log(result.rows);
    
    var data = JSON.stringify(result.rows);
    var detail = JSON.parse(data);

pool.query(sql1, function(err, result1){
    // If an error occurred...
    if (err) {
        console.log("Error in query: ");
        console.log(err);
    }

    console.log("Back from DB with result1:");
    console.log(sql1);
    console.log(result1.rows);

    let data1 = JSON.stringify(result1.rows);
    let detail1 = JSON.parse(data1);

    res.render("guitars", {info: detail, customer: detail1});
});
}); 
}   



function guitarOrders(res, userid) {
    var sql = "SELECT guitar.guitarname, guitar.price, orders.userid, orders.orderid FROM guitar INNER JOIN orders ON guitar.guitarid=orders.guitarid WHERE userid =" + userid;
    // var sql = "SELECT * FROM customer";
    
    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
    
        // Log this to the console for debugging purposes.
        console.log("Back from DB with result:");
        console.log(sql);
        console.log(result.rows);
        console.log(userid);
        
        var data = JSON.stringify(result.rows);
        var detail = JSON.parse(data);
    
    const name = "Christopher";
    
        console.log(detail);
        // let resultList = document.querySelector('allOrders');
        // resultList.append(detail);
        // $("#allOrders").append(detail);
        res.render("ordersPage", {info: detail, name: name});
        
    }); 
    }  

    function addGuitar(customer, guitar) {
        var sql = "INSERT INTO orders (orderid, userid, guitarid) VALUES (DEFAULT, " + customer + ", " + guitar + ")";
        // var sql = "SELECT * FROM customer";
        // var sql = "UPDATE orders SET guitarid=" + guitar + " WHERE userid=" + customer;

        pool.query(sql, function(err, result) {
            // If an error occurred...
            if (err) {
                console.log("Error in query: ")
                console.log(err);
            }
        
            // Log this to the console for debugging purposes.
            console.log("Back from DB with result:");
            console.log(sql);
        
            console.log("Number of rows inserted:" + result.affectedRows);
            // res.render("ordersPage", {info: detail, name: name});
           
        }); 
        } 

    function modifyCustomer(res, userid, newCustomer) {

            var sql = "UPDATE customer SET username = '"  + newCustomer + "' WHERE userid = " + userid;
            // var sql = "SELECT * FROM customer";
            // var sql = "UPDATE orders SET guitarid=" + guitar + " WHERE userid=" + customer;
    
            pool.query(sql, function(err, result) {
                // If an error occurred...
                if (err) {
                    console.log("Error in query: ")
                    console.log(err);
                }
            
                // Log this to the console for debugging purposes.
                console.log("Back from DB with result:");
                console.log(sql);
            
                console.log("Number of rows inserted:" + result.affectedRows);
                // res.render("ordersPage", {info: detail, name: name});

            }); 
            } 

            function getCustomers(res) {
            
                var sql1 = "SELECT * FROM customer WHERE userid <= 4";

                pool.query(sql1, function(err, result1){
                    // If an error occurred...
                    if (err) {
                        console.log("Error in query: ");
                        console.log(err);
                    }
                
                    console.log("Back from DB with result1:");
                    console.log(sql1);
                    console.log(result1.rows);
                
                    let data1 = JSON.stringify(result1.rows);
                    let detail1 = JSON.parse(data1);
                
                    res.render("customer", {customer: detail1});
                });
                }   

                function getCustomerOrder(res) {
            
                    var sql1 = "SELECT * FROM customer WHERE userid <= 4";
    
                    pool.query(sql1, function(err, result1){
                        // If an error occurred...
                        if (err) {
                            console.log("Error in query: ");
                            console.log(err);
                        }
                    
                        console.log("Back from DB with result1:");
                        console.log(sql1);
                        console.log(result1.rows);
                    
                        let data1 = JSON.stringify(result1.rows);
                        let detail1 = JSON.parse(data1);
                    
                        res.render("orders", {customer: detail1});
                    });
                    } 

                    function deleteOrders(res, orderid) {
                        var sql = "DELETE FROM orders WHERE orderid = " + orderid;
            // var sql = "SELECT * FROM customer";
            // var sql = "UPDATE orders SET guitarid=" + guitar + " WHERE userid=" + customer;
    
            pool.query(sql, function(err, result) {
                // If an error occurred...
                if (err) {
                    console.log("Error in query: ")
                    console.log(err);
                }
            
                // Log this to the console for debugging purposes.
                console.log("Back from DB with result:");
                console.log(sql);
            
                console.log("Number of rows inserted:" + result.affectedRows);
                // res.render("ordersPage", {info: detail, name: name});

            }); 
                    }

        
