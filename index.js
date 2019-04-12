function getRepositories() {
  const username = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/'+username+'/repos');
  req.send();
}

function displayRepositories() {
  //this is set to the XMLHttpRequest object that fired the event
  var repos = JSON.parse(this.responseText);
  // console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        r.name +
        ' - ' +
        r.html_url +
        '<br> - <a href="#" data-repository="' +
        r.name +
        '" data-username="' +
        r.owner.login +
        '" onclick="getCommits(this)">Get Commits</a>'+
        '<br> - <a href="#" data-repository="' +
        r.name +
        '" data-username="' +
        r.owner.login +
        '" onclick="getBranches(this)">Get Branches</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const username = el.dataset.username;
  const reponame = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/'+username+'/' + reponame + '/commits');
  req.send();
}

function getBranches(el) {
  const username = el.dataset.username;
  const reponame = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/'+username+'/' + reponame + '/branches');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<h3>Commits : </h3><br><ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.author.login +
        ' ' +
        commit.commit.author.name +
        '</strong> - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<h3>Branches : </h3><br><ul>${branches
    .map(branche => '<li>' + branche.name + '</li>')
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}
