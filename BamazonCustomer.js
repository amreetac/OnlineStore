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

    //console.log(prompt_result.ItemID); Commented consoles are for testing purposes!
    //console.log(prompt_result.StockQuantity);

    var query = 'SELECT ItemID, StockQuantity, Price FROM products'; 

    var database_values = connection.query(query, function(err, query_res) {
            //console.log(query_res[prompt_result.ItemID-1].ItemID);
            //console.log(query_res[prompt_result.ItemID-1].StockQuantity);
            
            
                if (prompt_result.StockQuantity > query_res[prompt_result.ItemID-1].StockQuantity) {   
                  console.log('Insufficient Quantity')
                } else {
                  query_res[prompt_result.ItemID-1].StockQuantity-= prompt_result.StockQuantity;

                  console.log('Total cost:' + prompt_result.StockQuantity * query_res[prompt_result.ItemID-1].Price);
                  console.log('Updated Stock Quantity:' + query_res[prompt_result.ItemID-1].StockQuantity);
                  console.log('Price:' + query_res[prompt_result.ItemID-1].Price);
                  }
            
  });
});
}
