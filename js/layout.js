function Layout() { }

// Search for a <footer> tag and populate it's inner HTML. 
Layout.prototype.loadFooter = function()
{
    var tags = document.getElementsByTagName('footer');
        $.get('layout/footer.html', function(data)
        {
            tags[0].innerHTML = data;
        });
}

// Search for a <nav> tag and populate it's inner HTML. 
Layout.prototype.loadNavBar = function(callback)
{
    var tags = document.getElementsByTagName('nav');
    $.get('layout/navbar.html', function(data)
    {
        tags[0].innerHTML = data;

        if (callback)
        {
            callback();
        }
    });
}

// Callback is invoked after header is created
Layout.prototype.load = function(callback)
{
    this.loadNavBar(callback);
    this.loadFooter();
}

Layout.prototype.setActive = function(navLink)
{
    $(navLink).addClass("active");
}