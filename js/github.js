const baseUrl = 'https://api.github.com/';

function GitHub() { }

// Return repo object from API:
GitHub.prototype.getRepo = function(user, repo, callback)
{
    $.getJSON(baseUrl + "repos/" + user + "/" + repo, function (data)
        {
            callback(data);
        });
}

// Return all repos for a user:
GitHub.prototype.getRepos = function(user, callback)
{
    var cache = sessionStorage.getItem('repos');
    if (!cache)
    {
        $.getJSON(baseUrl + "users/" + user + "/repos", function (data)
        {
            sessionStorage.setItem('repos', JSON.stringify(data));
            callback(data);
        });
    }
    else
    {
        cache = JSON.parse(cache);
        callback(cache);
    }
}

GitHub.prototype.getIssues = function(user, repo, callback)
{
    $.getJSON(baseUrl + "repos/" + user + "/" + repo + "/issues", function (data)
    {
        callback(data);
    });
}