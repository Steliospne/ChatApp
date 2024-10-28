const { Router } = require("express");
const { getUser, getUsers, getFriends } = require("../../db/queries");

const usersRouter = Router();

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

usersRouter.get("/", (req, res) => {
  res.render("login");
});

usersRouter.post("/authentication", async (req, res) => {
  const { userName, pwd } = req.body;
  const user = await getUser(userName);
  if (user.pwd === pwd) {
    res.redirect("/home" + "?usr=" + user.id);
  } else {
    res.redirect("/");
  }
});

usersRouter.get("/home", async (req, res) => {
  const user_id = req.query.usr;
  const friends = await getFriends(user_id);
  res.render("home", { friends: friends, messages: messages });
});

usersRouter.post("/message", (req, res) => {
  console.log(req.originalUrl);
  const msg = { text: req.body.message, added: getCurrentTime() };
  if (msg.text === "") return res.redirect("/home");
  messages.push(msg);
  res.redirect("/home");
});

module.exports = usersRouter;
