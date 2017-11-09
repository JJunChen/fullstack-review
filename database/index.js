const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repoName: String,
  userName: String,
  url: String,
  description: String,
  update: Date
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  for(let repo of repos) {
  	let repoInfo = {
  		repoName: repo.name,
  		userName: repo.owner.login,
  		url: repo.html_url,
  		description: repo.description,
  		update: repo.updated_at
  	}
  	var newRepo = new Repo(repoInfo);
  	newRepo.save()
  	.then(item => {
  		console.log('added');
  	})
  	.catch(err => {
  		console.log('failed');
  	})
  }
}

module.exports.save = save;