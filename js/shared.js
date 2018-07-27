function collapse(triggerElement, collapseElement, callback)
{
    $(triggerElement).click(function()
    {
        $(collapseElement).slideToggle();

        if(callback)
        {
            callback();
        }
    });
}

function collapseOnly(triggerElement, collapseElement, callback)
{
    $(triggerElement).click(function()
    {
        if ($(collapseElement).css('display') != 'none')
        {
            $(collapseElement).slideToggle();

            if(callback)
            {
                callback();
            }
        }
    });
}