const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repoName: String,
  userNameWithoutCase: String,
  userName: String,
  url: String,
  description: String,
  update: Date
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos, username) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  for(let i = 0; i < repos.length; i++) {
  	let repoInfo = {
  		repoName: repos[i].name,
  		userName: repos[i].owner.login,
  		userNameWithoutCase: repos[i].owner.login.toLowerCase(),
  		url: repos[i].html_url,
  		description: repos[i].description,
  		update: repos[i].updated_at
  	}
  	var newRepo = new Repo(repoInfo);
  	newRepo.save()
  	.then(item => {
  		console.log('added');
  		if (i === repos.length - 1) {
  			console.log('here');
  			return find(username);
  		}
  	})
  	.catch(err => {
  		console.log('failed');
  	})

  }
};

let find = (username) => {
	if (username) {
		return Repo.find({userNameWithoutCase: username})
		.sort({datefield: -1}).limit(25)
	} else {
		return Repo.find()
		.sort({datefield: -1}).limit(25)
	}
};

module.exports.save = save;
module.exports.find = find;