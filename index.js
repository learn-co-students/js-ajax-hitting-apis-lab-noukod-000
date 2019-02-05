function getRepositories(){
    const username = document.getElementById('username').value;
    
    const req = new XMLHttpRequest()
    req.addEventListener('load', displayRepositories)
    req.open('GET','https://api.github.com/users/'+username+'/repos')
    req.send()
}

function displayRepositories(){
    const repos = JSON.parse(this.responseText);
    
    const repoList = `<ul>${repos.map(repo =>
        '<li>'
        +repo.name+'<br>'
        +'<a href="'+repo.html_url+'">'+repo.html_url+'</a>'+'<br>'+
        '<a href="#" data-repository="'+repo.name+'" data-username="'+repo.owner.login+
        '" onclick="getCommits(this)"> Get Commits</a><br>'+
        '<a href="#" data-repository="'+repo.name+'" data-username="'+repo.owner.login+
        '" onclick="getBranches(this)">Get Branches</a>'+
        '</li>'
    ).join('')}</ul>`

    document.getElementById('repositories').innerHTML = repoList
    // console.log('repos:',repos)
}

function getCommits(el){
    const repoName = el.dataset.repository;
    const owner = el.dataset.username;
    
    console.log('repoName',repoName,'owner',owner)
    let req = new XMLHttpRequest()
    req.addEventListener('load', displayCommits)
    req.open('GET', 'https://api.github.com/repos/'+owner+'/'+repoName+'/commits')
    req.send()
}

function displayCommits(){
    let commits = JSON.parse(this.responseText)
    // console.log('comits',commits)
    const commitList = `<ul>${commits
        .map(commit=>
            '<li>'
            +commit.author.login+' - '
            +commit.commit.author.name+' - '
            +commit.commit.message
            +'</li>'
            ).join('')
        }</ul>`
    document.getElementById('details').innerHTML = commitList;

}

function getBranches(el) {
    const repoName = el.dataset.repository
    
    const xhr = new XMLHttpRequest()
    // console.log('repoName:',el.dataset.repo,'owner:',el.dataset.username)
    xhr.addEventListener("load", displayBranches)
    xhr.open("GET", 'https://api.github.com/repos/'+el.dataset.username+'/'+repoName+'/branches')
    xhr.send()
}

function displayBranches() {
    const branches = JSON.parse(this.responseText)
    // console.log('branches:',branches)
    const branchesList = `<ul>${branches.map(
        branch => '<li>' + branch.name + '</li>')
        .join('')
    }</ul>`
    document.getElementById("details").innerHTML = branchesList
}