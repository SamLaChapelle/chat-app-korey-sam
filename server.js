require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
// sets up port and staticDir for later use
const port = process.env.PORT || 8000;
const app = express();
const staticDir = process.env.DEV ? "./client/public" : "./client/build";
// set static path and middleware for reading req info
app.use(express.static(staticDir));
app.use(express.urlencoded({ extended: true }));
// secure connection to db through mongoose
mongoose.connect(`mongodb+srv://SamboSauce:${process.env.PASS}@cluster0.jvo7d.mongodb.net/Chat?authSource=admin&replicaSet=atlas-2ev78e-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`, { useNewUrlParser: true,  useUnifiedTopology: true})
// construct message schema to use for different dbs
const messageSchema = new mongoose.Schema({
  time: Date,
  author: String,
  body: String
})
// make model for all 3 chat rooms
const MainMessage = mongoose.model("MainMessage", messageSchema)
const VGMessage = mongoose.model("VideoGameMessage", messageSchema)
const MusicMessage = mongoose.model("MusicMessage", messageSchema)
// get requests for all 3 chat rooms to server up data
app.get("/chatrooms/main", async (req, res) => {
  // gather all messages in the appropriate database
  let mainMessages = await MainMessage.find({})
  // send all messages along to front end for use
  res.json(mainMessages)
})
app.get("/chatrooms/videogames", async (req, res) => {
  let vgMessages = await VGMessage.find({})
  res.json(vgMessages)
})
app.get("/chatrooms/music", async (req, res) => {
  let musicMessages = await MusicMessage.find({})
  res.json(musicMessages)
})
// post requests for all 3 chat rooms to submit a new message
app.post("/chatrooms/main", async(req, res) => {
  // construct new message for the database using the appropriate model and schema
  const message = new MainMessage({
    // generate time message was created
    time: Date.now(),
    // add user's name to the message
    author: req.body.username,
    // assign message body info to db entry
    body: req.body.message
  })
  // save message to the db using save() method
  await message.save();
  // redirect back to chatroom to reload page and view new message
  res.redirect("/chatrooms/main")
})
app.post("/chatrooms/videogames", async(req, res) => {
  const message = new VGMessage({
    time: Date.now(),
    author: req.body.username,
    body: req.body.message
  })
  await message.save();
  res.redirect("/chatrooms/videogames")
})
app.post("/chatrooms/music", async(req, res) => {
  const message = new MusicMessage({
    time: Date.now(),
    author: req.body.username,
    body: req.body.message
  })
  await message.save();
  res.redirect("/chatrooms/music")
})
// opening app up to listen on the assigned port variable
app.listen(port, () => {
  console.log('listening on port: ' + port) 
})