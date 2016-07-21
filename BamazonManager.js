var mysql = require('mysql');
var prompt = require('prompt');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "Smithsonian123", //Your password
    database: "Bamazon"
})

connection.connect(function(err) {
    if (err) throw err;
    productMenu();
})

var productMenu = function() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }).then(function(answer) {
        switch(answer.action) {
            case 'View Products for Sale':
                viewProducts();
            break;
            
            case 'View Low Inventory':
                viewLow();
            break;
            
            case 'Add to Inventory':
                addInventory();
            break;
            
            case 'Add New Product':
                addNew();
            break;
        }
    })
};


var viewProducts = function() {
     var query = 'SELECT ItemID, ProductName, Price, StockQuantity FROM `Products`';
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].ItemID + " | " + res[i].ProductName + " | " + res[i].Price + " | " + res[i].StockQuantity);
        }
        productMenu();
  })
};

var viewLow = function() {
    var query = 'SELECT ItemID, ProductName, Price, StockQuantity FROM `Products` WHERE StockQuantity < 5';
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].ItemID + " | " + res[i].ProductName + " | " + res[i].Price + " | " + res[i].StockQuantity);
        }
        productMenu();
  })
};

var addInventory = function() {
    console.log("Add inventory");
        productMenu();
};
var addNew = function() {
    console.log("Add new product");
        productMenu();
};

/*
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
            //console.log(database_values);
            
                if (prompt_result.StockQuantity > query_res.StockQuantity) {   
                  console.log('Insufficient Quantity')
                } else {
                  query_res.StockQuantity-= prompt_result.StockQuantity;

                  console.log('Total cost:' + prompt_result.StockQuantity * query_res.Price);
                  console.log('Updated Stock Quantity:' + query_res.StockQuantity);
                  console.log('Price:' + query_res.Price);
                  }
            

  
    console.log('Command-line input received:');
  });
});
}
*/

