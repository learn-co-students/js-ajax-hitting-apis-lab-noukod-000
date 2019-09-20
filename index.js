function getRepositories() {
  const username = document.getElementById('username').value
  const url = 'https://api.github.com/users/' + username + '/repos'
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", url);
  req.send();
  return false;
}

function displayCommits(){
  let commits= JSON.parse(this.responseText);
  // console.log(commits);

  const commitList =
  `<ul>
    ${commits.map(commit => `
      <li>
        ${commit.commit.author.name}
        ${commit.author.login}
        ${commit.commit.message}
      </li>
        `).join('')}
    </ul>`
    document.getElementById('details').innerHTML = commitList;
}

function getCommits(el){
  const username = el.dataset.username
  const repo = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayCommits)
  req.open('GET', `https://api.github.com/repos/${username}/${repo}/commits`)
  req.send
}

function displayBranches(){
  let branches= JSON.parse(this.responseText)
  const branchlist =
  `
  <ul>
    ${branches.map(branch => `
      <li>
        ${branch.name}
      </li>`).join('')}
  </ul>`
  document.getElementById('details').innerHTML = branchlist
}

function getBranches(el){
  let username = el.dataset.username
 const repo = el.dataset.repository
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${username}/${repo}/branches`)
  req.send();
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const repoList = "<ul>" + repos.map(repo => {
  const username = 'data-username="' + repo.owner.login + '"'
  const repoName = 'data-repository="' + repo.name + '"'
  return(`<li>
          <h2>${repo.name}</h2>
          <a href="${repo.html_url}">${repo.html_url}</a><br>
          <a href="#" ${username} ${username} onclick="getCommits(this)">Get Commits</a><br>
          <a href="#" ${repoName} ${repoName} onclick="getBranches(this)">Get Branches</a></li>
        </li>`
        )
  }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}






// function getRepositories(){
//   let input = document.getElementById('username').value;
//   const req = new XMLHttpResquest();
//   req.addEventListener('load', displayRepositories);
//   req.open('GET', `https://api.github.com/users/${username}/repos`);
//   req.send();
// }