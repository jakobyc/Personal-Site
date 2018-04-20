const baseUrl = 'https://api.github.com/';

// Return repo object from API:
function getRepo(user, repo, callback)
{
    $.getJSON(baseUrl + "repos/" + user + "/" + repo, function (data)
    {
        callback(data);
    });
}

function getIssues(user, repo, callback)
{
    $.getJSON(baseUrl + "repos/" + user + "/" + repo + "/issues", function (data)
    {
        callback(data);
    });
}

// element = element to append the template to.
function showIssues(user, repo, element)
{
    const templateString =
        '<div class="well well-sm">' +
            '<label>@state - @label</label>' +
            '<label style="float: right;">@date</label>' +
            '<h3>(#@issueNumber) @title</h3>' +
            '<p>@body</p>' +
            '<a class="btn theme-btn-git" target="_blank" href="@url">View on GitHub</a>' +
        '</div>';

    getIssues(user, repo, function(data)
    {
        $.each(data, function ()
        {
            var template = templateString;
            template = template.replace('@state', this.state);
            template = template.replace('@title', this.title);
            template = template.replace('@body', this.body);
            template = template.replace('@issueNumber', this.number)
            template = template.replace('@url', this.html_url);
            template = template.replace('@date', this.created_at);
            if (this.labels != null && this.labels.length > 0)
            {
                template = template.replace('@label', this.labels[0].name);
            }
            $(element).append(template);
        });
    });
}