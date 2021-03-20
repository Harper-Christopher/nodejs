const express = require('express');
const app = express();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const { Pool } = require("pg");
require('dotenv').config();
const bodyParser = require('body-parser');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const xhr = new XMLHttpRequest();
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
     getGuitar1(res);

});

app.get("/orders", function(req, res) {
    console.log("Received a request for the order page");
    res.render("orders");
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
    var guitar = req.body.guitar1;
    var price = req.body.price1;

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

// xhr.open("POST", "/orderDetail");
// xhr.onreadystatechange = function(req, res) {
//     if (this.readyState == 4 && this.status == 200) {
//     console.log("Received a request to display orders");
//     var userid = req.body.userid;
//     console.log(userid);
//     guitarOrders(res, userid);
//     }
// }




//------Model-------//
// function getCurrentLoggedInUserAccount() {
//     return "Christopher";
//   }


function getGuitar1(res) {
var sql = "SELECT * FROM guitar WHERE guitarid <= 6";

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
    
    var data = JSON.stringify(result.rows);
    var detail = JSON.parse(data);

const name = "Christopher";


    res.render("guitars", {info: detail, name: name});

}); 
}  



function guitarOrders(res, userid) {
    var sql = "SELECT guitar.guitarname, guitar.price, orders.userid FROM guitar INNER JOIN orders ON guitar.guitarid=orders.guitarid WHERE userid =" + userid;
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
