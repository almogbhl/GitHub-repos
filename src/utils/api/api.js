const api = {
  repositories: user =>
    `https://api.github.com/users/${user}/repos?per_page=10`,
  contributors: (user, repo) =>
    `https://api.github.com/repos/${user}/${repo}/contributors?per_page=10`
};

export default api;
