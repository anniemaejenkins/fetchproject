(function(){
  'use strict';


//use github api token for development purposes
//will not be present in production
var url = 'https://api.github.com/users/anniemaejenkins';
var repoUrl = 'https://api.github.com/users/anniemaejenkins/repos?sort=updated';
var headers = {};
var container = document.getElementById('pageDiv');
var profileRow = document.getElementById('sideDiv');
var repoRow = document.getElementById('mainDiv');
var bioRow = document.getElementById('bioDiv');
var topRow = document.getElementById('topDiv');
var profilePic = document.getElementById('profilePic');

  if(GITHUB_TOKEN){
//set the AJAX header to send the token

  headers['Authorization'] = 'token ' + GITHUB_TOKEN;
  }

//the second headers is the variable that is above the if statement
//it's common to name the variable the same name as the property of the object you're requesting
fetch(url, {headers: headers}).then(function(response){
response.json().then(function(data){
  var user = data;
console.log(data);
displayPage(user);
});


fetch(repoUrl).then(function(response){
  response.json().then(function(repo){
    for(var i = 0; i < repo.length; i++){
      var repoObject = repo[i];
      var repoDiv = document.createElement('div');
      repoRow.appendChild(repoDiv);

      var repoClick = document.createElement('a');
      repoClick.innerHTML = '<a href="' + repoObject.html_url + '">' + repoObject.name + '</a>';
      repoDiv.appendChild(repoClick);

      var repoTime = document.createElement('p');
      repoTime.innerHTML = repoObject.updated_at;
      repoDiv.appendChild(repoTime);
      console.log(repoObject);
    }
  });
});




function displayPage(user){

  // var profilePic = document.createElement('div');
  profilePic.src = user.avatar_url;
  // profileRow.appendChild(profilePic);

  var profileName = document.createElement('h1');
  profileName.innerHTML = user.name;
  bioRow.appendChild(profileName);

  var userName = document.createElement('h3');
  userName.innerHTML = user.login;
  bioRow.appendChild(userName);

  var userBio = document.createElement('p');
  userBio.innerHTML = user.bio;
  bioRow.appendChild(userBio);

  



}


});
}());
