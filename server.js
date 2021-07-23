require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");

const port = process.env.PORT || 8000;
const app = express();
const staticDir = process.env.DEV ? "./client/public" : "./client/build";

app.use(express.static(staticDir));
app.use(express.urlencoded({ extended: true }));

mongoose.connect(`mongodb+srv://SamboSauce:${process.env.PASS}@cluster0.jvo7d.mongodb.net/Chat?authSource=admin&replicaSet=atlas-2ev78e-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`, { useNewUrlParser: true,  useUnifiedTopology: true})

const messageSchema = new mongoose.Schema({
  time: Date,
  author: String,
  body: String
})

const MainMessage = mongoose.model("MainMessage", messageSchema)

const VGMessage = mongoose.model("VideoGameMessage", messageSchema)

const MusicMessage = mongoose.model("MusicMessage", messageSchema)

app.get("/chatrooms/main", async (req, res) => {
  let mainMessages = await MainMessage.find({})
  console.log(mainMessages)
  res.json(mainMessages)
})
app.get("/chatrooms/videogames", async (req, res) => {
  let vgMessages = await VGMessage.find({})
  console.log(vgMessages)
  res.json(vgMessages)
})
app.get("/chatrooms/music", async (req, res) => {
  let musicMessages = await MusicMessage.find({})
  console.log(musicMessages)
  res.json(musicMessages)
})

app.post("/chatrooms/main", async(req, res) => {
  const message = new MainMessage({
    time: Date.now(),
    author: req.body.username,
    body: req.body.message
  })

  //res.cookie("username", `${req.body.username}`)

  await message.save();

  res.redirect("/chatrooms/main")
})

app.post("/chatrooms/videogames", async(req, res) => {
  const message = new VGMessage({
    time: Date.now(),
    author: req.body.username,
    body: req.body.message
  })

  //res.cookie("username", `${req.body.username}`)

  await message.save();

  res.redirect("/chatrooms/videogames")
})
app.post("/chatrooms/music", async(req, res) => {
  const message = new MusicMessage({
    time: Date.now(),
    author: req.body.username,
    body: req.body.message
  })

  //res.cookie("username", `${req.body.username}`)

  await message.save();

  res.redirect("/chatrooms/music")
})

app.listen(port, () => {
  console.log('listening on port: ' + port) 
})