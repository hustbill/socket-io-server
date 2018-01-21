# Building a real-time server Using Socket.IO

The server will use Socket.IO to emit a message every 10 seconds and the client will listen for the same message over a real-time socket.  

## Dependencies  
* [danielzzz/node-ping](https://github.com/danielzzz/node-ping) 
```code  
// Promise wrapper
var ping = require('ping');

var hosts = ['192.168.1.1', 'google.com', 'yahoo.com'];

hosts.forEach(function (host) {
    ping.promise.probe(host)
        .then(function (res) {
            console.log(res);
        });
});
```  

## Reference 
* [Interpreting Latency and Packet Loss by Pingman Tools](https://www.pingplotter.com/wisdom/article/latency-packet-loss.html)  
* [danielzzz/node-ping](https://github.com/danielzzz/node-ping)  

## Data Sources
* [Top 500 domains] (https://moz.com/top500)  
* [Top 500 pages] (https://moz.com/top500/pages)  