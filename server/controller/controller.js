var Storedb = require('../model/model');
// This file is for the 4 CRUD Operations:
// create and save new user 
// Api Request
//create call back function:
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"}); // when the req make a post req with empty body 
        return; // if the user make an empty req
    }
// Whenever the user make a post Req using a form ,
//All the data of the form is stored in the body of the req object
//and using this body we can access all the form Data
//Get Data from post method: and create and instance called user of the Storedb model
    // new user , new instance of the Soredb schema 
    const store = new Storedb({
        //values for the user Schema 
        //When the user make a post req: 
        name : req.body.name,
        address : req.body.address,
        open : req.body.open,
        close : req.body.close,
        status : req.body.status
    })

    // save user (Data) in the database
    //.save (object we declared above) 
    store
        .save(store) 
        .then(data => {
          //  res.send(data); //For Postman

          //user to be replaced with store
            res.redirect('/add-store'); //For actual App//redirect the user to a page you can redirect them to any page you want 
        })
        .catch(err =>{

            res.status(500).send({
            // if this variable(err.message) return nothing 
            //i'm going to specify value :"Some error occurred while creating a create operation"
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

    if(req.query.id){ // if the user wanted to find a selected id 
      //  retrive and return a single user we use params in postman + select a certain id the url is diff like this : http://localhost:3000/api/users?id=6252e9a55b5291c52a429dbd
        const id = req.query.id; 
        Storedb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found store with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving store with id " + id})
            })

    }else{
        //return all records inside the database
        Storedb.find()
            .then(store => {
                res.send(store)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving store information" })
            })
    }

    
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Storedb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update store with ${id}. Maybe store not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update store information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id; //get id value from the req

    Storedb.findByIdAndDelete(id)
        .then(data => {
            if(!data){ //if we don't have data
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Store was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete Store with id=" + id
            });
        });
}