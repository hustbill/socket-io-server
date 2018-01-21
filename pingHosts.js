
var ping = require('ping');

const top500Domains = require('./top500domains.json')
const selectedDomains = top500Domains.slice(0, 12);
const pingRequests = [];

const pingHosts = (selectedDomains) => {
  selectedDomains.forEach(function (domain) {
    pingRequests.push(ping.promise.probe(domain.URL)
      .then(function (res) {
        return res;
      }));

  });
   Promise.all(pingRequests).then(function (pingResults) {
    // console.log('pingResults: ', pingResults);
  })
}


 