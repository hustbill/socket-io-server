const dns = require('dns');

const checkInternet = (website) => {
  dns.lookup('google.com', function(err) {
    if (err && err.code == "ENOTFOUND") {
      website(false);
    } else {
      website(true);
    }
  })  
}

// example useage:
checkInternet(function(isConnected) {
  if (isConnected) {
    console.log('connected to the Internet');
  } else {
    console.log('not connected to the Internet');
  }
})

