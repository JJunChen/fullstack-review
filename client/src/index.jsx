import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  componentDidMount () {
    this.getRepos();
  }

  addRepos (repos) {
    this.setState({repos: repos});
  }

  getRepos (username) {
    fetch('http://localhost:1128/repos?user=' + username, {
      method: 'get',
      // data: {username: username}
    })
    .then((res) => {
      return res.json();
    })
    .then(data => {
      this.addRepos(data);
    }) 
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    fetch('http://localhost:1128/repos', {
      method: 'post',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({username: term})
    })
    .then(() => {
      this.getRepos(term);
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));