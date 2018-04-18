const baseUrl = 'https://api.github.com/';

// Return repo object from API:
function getRepo(user, repo, callback)
{
    $.getJSON(baseUrl + "repos/" + user + "/" + repo, function (data)
    {
        callback(data);
    });
}