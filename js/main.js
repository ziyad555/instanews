$('#dropdown-menu').on('change', function () {
   $.ajax({
      method: 'GET',
      url: 'https://api.nytimes.com/svc/topstories/v2/' + $('#dropdown-menu').val() + '.json?api-key=0751ffff01d7a70710354972fa0ad4a9'
   })
      .done(function (data) {
         // loop in the function in order to get 12 different articles in the dropdown menu
         $('.news-area').empty();
         for (i = 0; i <= 12; i++) {
            console.log(data.results);
            var description = data.results[i].abstract
            var imageUrl = data.results[i].multimedia[4].url
            var articleLink = data.results[i].url
            console.log(articleLink)
            console.log(description)
            console.log(imageUrl)
            var htmlString = '<a class="textColor" href="' + articleLink + '"><div class="articleContainer"><h1>' + description + '</h1></div></a>'
            $('.articleContainer').last().css('background-image', 'url(' + imageUrl + ')');
            $('.news-area').append(htmlString);
         }
      });
});
