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
  prompt.start();
  prompt.get(['ItemID', 'StockQuantity'], function (err, prompt_result) {

   var query = 'SELECT ItemID, StockQuantity FROM `Products`';
     connection.query(query, function(err, query_res) {
            if (prompt_result.StockQuantity < 0) {   
                  console.log('Insufficient Quantity')
                } else {
                  query_res[prompt_result.ItemID-1].StockQuantity+= prompt_result.StockQuantity;
                  //parseFloat(query_res[prompt_result.ItemID-1].StockQuantity)+= parseFloat(prompt_result.StockQuantity);
                  console.log('Updated Stock Quantity:' + query_res[prompt_result.ItemID-1].StockQuantity);
                  }
        productMenu();
    })
    });
};

/*
var addInventory = function() {
  prompt.start();
  prompt.get(['ItemID', 'StockQuantity'], function (err, prompt_result) {

   connection.query = "UPDATE Products SET StockQuantity = StockQuantity + ? WHERE ItemID = ?", 
     [prompt_result.StockQuantity, prompt_result.ItemID], function(err, query_res) {
            if (prompt_result.StockQuantity < 0) {   
                  console.log('Insufficient Quantity')
                } else {
                  console.log('Updated Stock Quantity:' + query_res[prompt_result.ItemID-1].StockQuantity);
                  }
        productMenu();
    }
    });
};

*/

/*

var addNew = function() {
    inquirer.prompt([
    {
        name: "newproduct",
        type: "input",
        message: "What product would you like to add?"
    },

    {
        name: "dept",
        type: "input",
        message: "What department does this belong to?"
    },
    {
        name: "price",
        type: "input",
        message: "What should be the price?"
    },
    {
        name: "stock",
        type: "input",
        message: "How much inventory is available?"
    }
    ]).then(function(answer) {
        console.log(answer.newproduct)
        connection.query('INSERT INTO `Products` (`ProductName`,`DepartmentName`, `Price`,`StockQuantity`)  SET "`ProductName` = ?", "`DepartmentName` = ?", "`Price` = ?", "`StockQuantity` = ?"', {newproduct: answer.newproduct, answer.dept, answer.price, answer.stock}, function(err, res) {
            console.log("New Product: " + answer.newproduct);
            console.log("Department of New Product: " + answer.dept);
            console.log("Price of New Product: " + answer.price);
            console.log("Inventory of New Product: " + answer.stock);
        productMenu();

        })
    })
};

*/