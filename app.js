const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const usersRouter = require("./public/routes/usersRoute");

app.set("views", path.join(__dirname + "/public/views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", usersRouter);

app.listen(port, () => console.log(`ChatApp listening on port ${port}!`));
