function getRepositories(){
  const username=document.getElementById("username").value;
  const xhr=new XMLHttpRequest();
  xhr.addEventListener("load",showRepositories);
  xhr.open("GET",`https://api.github.com/users/${username}/repos`)
  xhr.send()
}

function displayRepositories(){
  const response=JSON.parse(this.responseText)
  let repoList = '<ul>';
  for (var i = 0; i < response.length; i++) {
    const repoOwner=response[i].owner.login.toString();
    const repoName=response[i].name.toString();
    //debugger;
    repoList += `<li>${repoName}<a href="#" data-repository="${repoName}" data-username="${repoOwner}" onclick="getCommits(this)">Get Commits</a>
    <a href="#" data-repository="${repoName}" data-username="${repoOwner}" onclick="getBranches(this)">Get Branches</a>https://github.com/${repoOwner}/${repoName}</li>`;
  }
  repoList += '</ul>';
  document.getElementById('repositories').innerHTML = repoList;
}

function showRepositories(){
  const response=JSON.parse(this.responseText)
  let repoList = '<ul>';
  for (var i = 0; i < response.length; i++) {
    const repoOwner=response[i].owner.login.toString();
    const repoName=response[i].name.toString();
    //debugger;
    repoList += `<li>${repoName}<a href="#" data-repo="${repoName}" data-repo-owner="${repoOwner}" onclick="getCommits(this)">Get Commits</a>
    <a href="#" data-repo="${repoName}" data-repo-owner="${repoOwner}" onclick="getBranches(this)">Get Branches</a>https://github.com/${repoOwner}/${repoName}</li>`;
  }
  repoList += '</ul>';
  document.getElementById('repositories').innerHTML = repoList;
}

function displayCommits(){
  const response=JSON.parse(this.responseText);
  let commitList='<ul>'
  for (var i = 0; i < response.length; i++) {
    const githubName=response[i]["author"]["login"];
    console.log(githubName)
    const fullName=response[i]["commit"]["committer"]["name"];
    const commitMessage=response[i]["commit"]["message"];
    //debugger;
    commitList += `<li>${githubName} | ${fullName} | ${commitMessage}</li>`;
  }
  commitList+="</ul>"
  document.getElementById("details").innerHTML+=commitList;
}


function getCommits(element){
  // /repos/:owner/:repo/git/commits/
  const repo=element.dataset.repository;
  const owner=element.dataset.username;
  console.log(repo,owner)
  const xhr=new XMLHttpRequest();
  xhr.addEventListener("load",displayCommits);
  xhr.open("GET",`https://api.github.com/repos/${owner}/${repo}/commits`)
  xhr.send();
}


function getBranches(element){
  const repo=element.dataset.repository;
  const owner=element.dataset.username;
  let xhr=new XMLHttpRequest();
  xhr.addEventListener("load",displayBranches);
  xhr.open("GET",`https://api.github.com/repos/${owner}/${repo}/branches`)
  xhr.send();
}

function displayBranches(){
  const response=JSON.parse(this.responseText);
  let branchesList="<ul>"
  for(let i=0;i<response.length;i++){
    branchesList+=`<li>${response[i].name}</li>`
  }
  branchesList+="</ul>"
  document.getElementById("details").innerHTML=branchesList;
}
