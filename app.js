const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const ping = require('ping');

const shuffle = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

const app = express();
app.use(index);
const server = http.createServer(app);

const top500Domains = require('./top500domains.json')
const selectedDomains = top500Domains.slice(0, 50);
const pingRequests = [];

const io = socketIo(server);
io.on("connection", socket => {
  console.log("New client connected"), setInterval(
    () => getApiAndEmit(socket),
    2000
  );
  socket.on("disconnect", () => console.log("Client disconnected"));
});


const getApiAndEmit = async socket => {
  try {

    selectedDomains.forEach(function (domain) {
      pingRequests.push(ping.promise.probe(domain.URL)
        .then(function (res) {
          // console.log('res: ', res);
          return res;
        }));

    });
    Promise.all(pingRequests).then(function (pingResults) {
      socket.emit("FromAPI", shuffle(pingResults));
      // socket.emit("FromAPI", pingResults);
    })
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};
server.listen(port, () => console.log(`Listening on port ${port}`));