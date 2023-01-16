
export function getUser(name) {
  return fetch(`https://api.github.com/users/${name}`);
}


export function getRepos(url) {
  console.log(url);
  return fetch(url);
}
