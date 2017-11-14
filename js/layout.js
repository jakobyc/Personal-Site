loadLayout();

// Search for a <nav> tag and populate it's inner HTML. 
function loadNavBar()
{
    var tags = document.getElementsByTagName('nav');
    tags[0].innerHTML =
    `
    <div class="navbar navbar-inverse">
        <div class="navbar-header">
            <a class="navbar-brand" id="nav-name">Chad Jakoby</a>
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <li><a class="active" href="index.html">Home</a></li>
                <li><a href="projects.html">Projects</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <a class="theme-btn-git" href="https://github.com/jakobyc" target="_blank">
                        <i class="fa fa-lg fa-github" aria-hidden="true"></i>
                    </a>
                </li>
                <li>
                    <a class="theme-btn-linkedin" href="https://www.linkedin.com/in/chad-jakoby-084599bb" target="_blank">
                        <i class="fa fa-lg fa-linkedin" aria-hidden="true"></i>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    `;
}

// Search for a <footer> tag and populate it's inner HTML. 
function loadFooter(id)
{
    var tags = document.getElementsByTagName('footer');
    tags[0].innerHTML =
    `
    <div id="footer">
        <div class="container">
            <p style="float: right">&copy; Chad Jakoby</p>
        </div>
    </div>
    `
}

function loadLayout()
{
    loadNavBar();
    loadFooter();
}