const express= require("express");
const path = require("path");

const app = express();




app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")))




app.get("/", (req, res) => {
    res.render("index");
});


if (process.env.NODE_ENV !== "production") {
  app.listen(8080, () => {
    console.log("server is listening to port 8080");
  });
}



module.exports = app;