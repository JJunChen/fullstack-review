const express = require('express');
const bodyParser = require('body-parser');
const getReposByUsername = require('../helpers/github');
const db = require('../database/index.js');
let app = express();


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
	let username = req.body.username.toLowerCase();
	db.find(username)
	.then(existingRepos => {
		if (existingRepos.length > 1) {
			res.writeHead(200);
			res.end(JSON.stringify(existingRepos));
		} else {
			getReposByUsername(username)
			.then((data)=> {
				let body = JSON.parse(data);
				db.save(body, username)
				.then((repos) => {
					console.log('repos');
					res.writeHead(201);
					res.end();
				})
			})
		}
	})
	.catch(err => {
		console.log(err);
	})
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  let query = req.url.split('?');
  let user = query[1].split('=');

  if (user[1] !== 'undefined') {
  	console.log('user', user.length);
  	let username = user.toLowerCase();
	  db.find(username)
	  .then(existingRepos => {
	  	if(existingRepos.length > 1) {
	  		res.writeHead(200);
	  		res.end(JSON.stringify(existingRepos));
	  	} 
	  })
  } else {
  	db.find()
	  .then(existingRepos => {
	  	if(existingRepos.length > 1) {
	  		res.writeHead(200);
	  		res.end(JSON.stringify(existingRepos));
	  	} 
	  })
  }
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

