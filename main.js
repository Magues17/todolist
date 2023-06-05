

//import express the framework
const express = require("express");
const { title } = require("process");

// create our application object
const app = express();

// make sure our application can parse json, use the middleware
app.use(express.json());

// define the port tha tthe app will listen on
let PORT = 9091;

let db = [];


// we have 5 different routers that we need to define, and implement

        // 1 read the title from the request body
        let t = req.body.title;
        // 2 read the notes from the request body
        let n = req.body.notes;
        // 3 create a new object
        // 4 set the title and the notes of the new object, useing 1 and 2
        let newEntry = {
            title: t,
            notes: n,
            id: counter
        }
        counter ++;

        // add the entry to the db array
        db.push(newEntry);

      // res.sendStatus(204);  send status code only

      // res.sendStatus(201).json(newEntry);  send status code and json

        res.json(newEntry); // sends json, and default 200 status



        // loop through the db arraym and create a new arrary of objects that do not have the details

        let summaries = db.map(function(element){
            let summary = {};
            summary.title = element.title;
            summary.done = element.done;
            summary.id = element.id;
            return summary;
        })

        res.json(summaries);
        
        let id = req.params.id;

       

// define a router that will add an entry
app.post("/todos", function(req, res){
    res.json("POST /todos");
})
// define a router that will list the summaries of all the entries
app.get("/todos", function(req, res){
    res.json("GET /todos");
})
// define a route that will get the details of a signle entry
app.get("/todos/:id", function(req, res){
    res.json("GET /todos/:id");

    let found = db.find(function(element){
        if (element.id == id) {
            return true;

        }else {
            return false;
        }
    });

   if (found) {
    res.json(found);
    } else {
        res.sendStatus(404);
    }

})
// define a router that will deelete and entry
app.delete("/todos/:id", function(req, res){
    res.json("DELETE /todos/:id");

    let id = req.params.id;
    let newDB = db.filter(function(element){
        if (element.id == id) {
            return true;

        }else {
            return false;
        }
    })

    db = newDB;
})
// define a route that will update and entry
app.put("/todos/:id", function(req, res){
    res.json("PUT /todos/:id");

    let id = req.params.id;
    let title = req.body.title;
    let notes = req.body.notes;
    let done = req.body.done == true;
    
    let found = db.find(function(element){
        if (element.id == id) { return true; 
        
        }else {
            return false;
        }
    });
});

if (found) {
    found.title = title;
    found.notes = notes;
    found.done = done;
    res.sendStatus(204);

}else {
    res.sendStatus(404);
}

// start our application on port
app.listen(PORT, function(){
    console.log("Todo Application started on port", PORT);
})