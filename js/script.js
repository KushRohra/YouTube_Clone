// Search bar Handler
$(function(){
    var searchField = $('#query');
    var icon = $('#search-btn');

    //Focus Event Handler
    $(searchField).on('mouseenter', function(){
        $(this).animate({
            width: '100%'
        }, 400);
        $(icon).animate({
            right: '10px'
        }, 400);
    });

    //Blur Event Handler
    $(searchField).on('mouseleave', function(){
        if(searchField.val() == '') {
            $(searchField).animate({
                width: '45%'
            }, 400, function() {});
            $(icon).animate({
                right: '360px'
            }, 400, function() {});
        }
    });

    $('#search-form').submit(function(e){
        e.preventDefault();
    });
})

function search() {
    // Clear Results which are already displayed right now
    $('#results').html('');
    $('#buttons').html('');

    // Get input from Form 
    q = $('#query').val();

    // Run Get Request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
            part: 'snippet, id',
            q: q,
            type: 'video, playlist',
            key: 'AIzaSyAwh7WSYc6fzE_NhXM6jEfbSPpoEeH5eAU' },
            function(data) {
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;

                $.each(data.items, function(i, item) {
                    // Get Output
                    var output = getOutput(item);

                    //Display results
                    $('#results').append(output);
                });
            } 
    );
}