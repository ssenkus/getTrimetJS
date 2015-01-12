var request = require('request');
request('http://developer.trimet.org/ws/V1/arrivals/?appID=5E48DCD7031297B7CBF2F37FD&locIDs=2580&json=true', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Print the google web page.
// console.log(JSON.stringify(body, null, '\t'))

  }
})
