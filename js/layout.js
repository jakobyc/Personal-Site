// Search for a <nav> tag and populate it's inner HTML. 
function loadNavBar()
{
    var tags = document.getElementsByTagName('nav');
    tags[0].innerHTML =
    '<div class="navbar navbar-inverse">' +
        '<div class="navbar-header">' +
            '<a class="navbar-brand" id="nav-name">Chad Jakoby</a>' +
            '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">' +
                '<span class="icon-bar"></span>' +
                '<span class="icon-bar"></span>' +
                '<span class="icon-bar"></span>' +
            '</button>' +
            '<a class="navbar-brand show-mobile" href="https://github.com/jakobyc" style="float: right; color: #83168e;">' +
                '<i class="fa fa-lg fa-github" aria-hidden="true"></i>' +
            '</a>' +
            '<a class="navbar-brand show-mobile" href="https://www.linkedin.com/in/chad-jakoby-084599bb" style="float: right; color: #3570b3;">' +
                '<i class="fa fa-lg fa-linkedin" aria-hidden="true"></i>' +
            '</a>' +
        '</div>' +
        '<div class="navbar-collapse collapse">' +
            '<ul class="nav navbar-nav">' +
                '<li><a href="index.html" id="navHome">Home</a></li>' +
                '<li><a href="projects.html" id="navProjects">Projects</a></li>' +
            '</ul>' +
            '<ul class="nav navbar-nav navbar-right">' +
                '<li>' +
                    '<a class="theme-social-git hide-mobile" href="https://github.com/jakobyc" target="_blank">' +
                        '<i class="fa fa-lg fa-github" aria-hidden="true"></i>' +
                    '</a>' +
                '</li>' +
                '<li>' +
                    '<a class="theme-social-linkedin hide-mobile" href="https://www.linkedin.com/in/chad-jakoby-084599bb" target="_blank">' +
                        '<i class="fa fa-lg fa-linkedin" aria-hidden="true"></i>' +
                    '</a>' +
                '</li>' +
            '</ul>' +
        '</div>' +
    '</div>';
}

// Search for a <footer> tag and populate it's inner HTML. 
function loadFooter()
{
    var tags = document.getElementsByTagName('footer');
    tags[0].innerHTML =
    '<div id="footer">' +
        '<div class="container">' +
            '<p style="float: right">&copy; Chad Jakoby</p>' +
        '</div>' +
    '</div>';
}

function setActive(navLink)
{
    $(navLink).addClass("active");
}

function loadLayout()
{
    loadNavBar();
    loadFooter();
}