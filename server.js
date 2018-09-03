const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



require("./app/routing/apiRoutes")(app); // ---------- Routers -------------//
require("./app/routing/htmlRoutes")(app);










app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});

process.on( 'SIGINT', function() {
    console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
    process.exit();
})