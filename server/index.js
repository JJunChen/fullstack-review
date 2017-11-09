const express = require('express');
const bodyParser = require('body-parser');
const getReposByUsername = require('../helpers/github');
const db = require('../database/index.js');
let app = express();


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
	let username = req.body.username;
	getReposByUsername(username)
	.then((data)=> {
		let body = JSON.parse(data);
		db.save(body);
	})
	.then(() => {
		res.writeHead(200);
		res.end({data: 'data'});
	})
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

