const rp = require("request-promise"); // for doing async requests
const cheerio = require("cheerio"); // for jquery-like selecting
const fs = require('fs');

const url = "https://wow.gamepedia.com/Gallery_of_player_avatars";

rp(url, (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    /* Pull all the images of the avatar page */
    $("p a.image img").each((i, el) => { 
        // console.log($(el).attr('src'));
        const imageUrl = $(el).attr('src');
        var imageName = $(el).attr('alt');
        imageName =imageName.replace(/ /g,"_").replace(/\./g,'') + ".gif"; // Remove spaces/periods
        console.log(imageName);
        rp(imageUrl,{encoding:'binary'})
        .then((img) => {
            fs.writeFile('./avatarImages/'+imageName, img, 'binary',function(err){})
        })
    });

  } else {
    console.error(error);
  }
});
