// Search for a <nav> tag and populate it's inner HTML. 
function loadNavBar(callback)
{
    var tags = document.getElementsByTagName('nav');
    $.get('layout/header.html', function(data)
    {
        tags[0].innerHTML = data;

        if (callback)
        {
            callback();
        }
    });
}

// Search for a <footer> tag and populate it's inner HTML. 
function loadFooter()
{
    var tags = document.getElementsByTagName('footer');
    $.get('layout/footer.html', function(data)
    {
        tags[0].innerHTML = data;
    });
}

function setActive(navLink)
{
    $(navLink).addClass("active");
}


// Callback is invoked after header is created
function loadLayout(callback)
{
    loadNavBar(callback);
    loadFooter();
}

// Add listeners to sidenav to toggle displayed content.
function enableSidenavClick()
{
    $('.sidenav a').click(function () {
        if (!$(this).hasClass('active-item')) {
            // Get id of element to display:
            var showId = $(this).attr('href');

            // Remove all active-item classes:
            $('.sidenav a').removeClass('active-item');

            // Hide displayed content:
            $('.sidenav-content-item').hide();
            //$('.sidenav-content.active-item').hide();

            // Show element and set sidenav item to active:
            $(showId).show();
            $(this).addClass('active-item');


            // Prevent href from moving to the top of the page:
            return false;
        }
    });
}

