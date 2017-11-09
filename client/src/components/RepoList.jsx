import React from 'react';

const RepoList = (props) => {

	const repoList = [];
	props.repos.forEach((repo, index) => repoList.push(<li key={index}><p>{repo.repoName}</p><p>{repo.description}</p></li>));

	return (
	  <div>
	    <h4> Repo List Component </h4>
	    There are {props.repos.length} repos.
	    <ul>
	    {repoList}
	    </ul>
	  </div>
	);
}



export default RepoList;