// your code here
function getRepositories() {
    let username = document.getElementById("username").value;

    const request = new XMLHttpRequest();
    request.addEventListener('load', displayRepositories);
    request.open('GET', `https://api.github.com/users/${username}/repos`);
    request.send();
}

function displayRepositories() {
    let repos = JSON.parse(this.responseText);

    const repoList = `<ul>${repos.map(
        rep => '<li><a href="' + rep.html_url + '">' +
        rep.name + '</a> - <a href="#" data-repository="' +
        rep.name + '"data-username="' +
        rep.owner.login +
        '"onclick="getCommits(this)"> Get Commits</a> | <a href="#" data-repository="' +
        rep.name + '"data-username="' +
        rep.owner.login +
        '" onclick="getBranches(this)"> Get Branches</a> </li>').join(' ')
    }</ul>`

    document.getElementById('repositories').innerHTML = repoList;
}

function displayCommits() {
    const commits = JSON.parse(this.responseText);
    const commitList = `<ul>${commits.map(
        com => '<li><strong>' + com.author.login + '</strong>-' +
        com.commit.message + com.commit.committer.name + '</li>'
    ).join(' ')}</ul>`

    document.getElementById('details').innerHTML = commitList;
}

function displayBranches() {
    const branches = JSON.parse(this.responseText);
    const branchList = `<ul>${branches.map(
        branch => '<li><strong>' + branch.name + '</li>'
    ).join(' ')}</ul>`
    document.getElementById('details').innerHTML = branchList;
}

function getCommits(el) {
    let repo = el.dataset.repository;
    let username = el.dataset.username;
    console.log(name);

    const request = new XMLHttpRequest();
    request.addEventListener('load', displayCommits);
    request.open('GET', `https://api.github.com/repos/${username}/${repo}/commits`);
    request.send();
}

function getBranches(el) {
    const name = el.dataset.repository;
    const username = el.dataset.username;

    const request = new XMLHttpRequest();
    request.addEventListener('load', displayBranches);
    request.open('GET', 'https://api.github.com/repos/'+ username + '/' + name + '/branches');
    request.send();
}
