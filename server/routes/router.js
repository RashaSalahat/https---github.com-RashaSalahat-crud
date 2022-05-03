const express = require('express');
//const app = express() would create new app so we create route
const route = express.Router() // method of express :we create a different touter in a separate file

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-store', services.add_store)

/**
  *  @description for update user
  *  @method GET /update-user
  */
route.get('/update-store', services.update_store)


// API/*
route.post('/api/stores', controller.create);
route.get('/api/stores', controller.find); // this route to get single & multiple users
route.put('/api/stores/:id', controller.update);
route.delete('/api/stores/:id', controller.delete);


module.exports = route