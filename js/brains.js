function grabTranslations(context)
{
    // This will pull the string out of the file and bring it into the HTML
    // L10: This is displaying the country name of France
    $("p[data-translatable='fr_FR']").text( context.gettext("France") );

    // L10: This is displaying the country name of England
    $("p[data-translatable='en_GB']").text( context.gettext("England") );

    // L10: This is displaying the country name of Germany
    $("p[data-translatable='de_DE']").text( context.gettext("Germany") );

    // L10: Welcome message to the user at the beginning of the webpage
    $("h1").text( context.gettext("Welcome Translators!") );
}

function changeLocale(locale)
{
    $.ajax
    ({
        url: "lang/" + locale + ".json",
        type: "get",
        dataType: "json"
    })
    .done(function(data)
    {
        var i18n = new Jed(
        {
            // Generally output by a .po file conversion
            "locale_data" : data.locale_data,
            "domain" : "somedomain"
        });

        grabTranslations(i18n);
    })
    .fail(function()
    {
        console.log("failed to get file")
    });
}

$(document).ready( function()
{
    $(".languageIcon").on("click", function(event)
    {
        changeLocale($(event.target).siblings("p").attr("data-translatable"));
    });
});