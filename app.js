const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.set("views", path.join(__dirname + "/public/views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const getCurrentTime = () => new Date().toISOString().split("T")[1].slice(0, 5);

const messages = [
  {
    text: "Hi there!",
    added: getCurrentTime(),
  },
  {
    text: "Hello World!",
    added: getCurrentTime(),
  },
];

app.get("/", (req, res) => res.render("home", { messages: messages }));

app.post("/message", (req, res) => {
  const msg = { text: req.body.message, added: getCurrentTime() };
  if (msg.text === "") return res.redirect("/");
  messages.push(msg);
  console.log(msg);
  res.redirect("/");
});

app.listen(port, () => console.log(`ChatApp listening on port ${port}!`));
