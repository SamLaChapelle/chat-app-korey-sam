require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");

const port = process.env.PORT || 8000;
const app = express();
const staticDir = process.env.DEV ? "./client/public" : "./client/build";

app.use(express.static(staticDir));

mongoose.connect(`mongodb+srv://SamboSauce:${process.env.PASS}@cluster0.jvo7d.mongodb.net/Chat?authSource=admin&replicaSet=atlas-2ev78e-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`)

const messageSchema = new mongoose.Schema({
  time: Date,
  author: String,
  body: String
})

const MainMessage = mongoose.model("MainMessage", messageSchema)

app.get("/mainData", async (req, res) => {
  let mainMessages = await MainMessage.find({})
  res.json(mainMessages)
})

app.post("/mainMessage", async(req, res) => {
  const message = new MainMessage({
    time: new Date(),
    author: req.body.name,
    body: req.body.message
  })
})

app.listen(port, () => {
  console.log('listening on port: ' + port) 
})