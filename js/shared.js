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