const cors = require('cors');

// pass app, passport and corsOptions modules
module.exports = function (app, passport) {
    
    // get all controllers
    const usersController = require("../controllers/UsersController");
    const productsController = require("../controllers/ProductsController");

    // users routes
    app.post("/login", checkIfAlreadyLoggedIn, usersController.loginUser);
    app.post("/signUp", checkIfAlreadyLoggedIn, usersController.signUp);
    app.delete("/logout", usersController.logoutUser); 

    // products routes
    app.get("/", productsController.listProducts); // should be app.get("/", checkIfNotLoggedIn, productsController.listProducts); but excluded here for demo purposes (otherwise run into CORS issues)

    function checkIfNotLoggedIn(req, res, next) {

        if (req.isAuthenticated()) {
            return next()   
        }

        return res.json({"error": "Access denied, please login first."})
    }

    function checkIfAlreadyLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return res.json({"error": "Already logged in."})
        }
        next()
    }


}
