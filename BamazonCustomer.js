var mysql = require('mysql');
var prompt = require('prompt');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "Smithsonian123", //Your password
    database: "Bamazon"
})

connection.connect(function(err) {
    if (err) throw err;
})

var productInfo = function() {
    var query = 'SELECT ItemID, ProductName, Price FROM `Products`;'
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].ItemID + " | " + res[i].ProductName + " | " + res[i].Price);
        }
        productMenu();
    })
};

productInfo();

var productMenu = function(){

var prompt = require('prompt');
 
  // 
  // Start the prompt 
  // 
  prompt.start();
 
  // 
  // Get two properties from the user: ID and number of units 
  // 
  prompt.get(['ItemID', 'StockQuantity'], function (err, res) {
    // 
    // Log the results. 
    // 
    console.log('Command-line input received:');
    console.log('  username: ' + res[i].ItemID);
    console.log('  email: ' + res[i].StockQuantity);
  });
}