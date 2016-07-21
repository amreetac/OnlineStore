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
  prompt.get(['ItemID', 'StockQuantity'], function (err, prompt_result) {
    // 
    // Log the results. 
    // 

    console.log(prompt_result.ItemID);
    console.log(prompt_result.StockQuantity);

    var query = 'SELECT StockQuantity, Price FROM products WHERE ItemID = ?'; 

    var database_values = connection.query(query, {ItemID: prompt_result.ItemID}, function(err, query_res) {
            //console.log(query_res.length);
            console.log(database_values);
            for (var i = 0; i < query_res.length; i++) {
                if (prompt_result.StockQuantity > query_res[i].StockQuantity) {   //how to define variable from database to compare with user input?
                  console.log('Insufficient Quantity')
                } else {
                  query_res[i].StockQuantity-= prompt_result.StockQuantity;

                  console.log('Total cost:' + prompt_result.StockQuantity * query_res[i].Price);
                  console.log('Updated Stock Quantity:' + query_res[i].StockQuantity);
                  console.log('Price:' + query_res[i].Price);
                  }
            }

  
    console.log('Command-line input received:');
  });
});
}
