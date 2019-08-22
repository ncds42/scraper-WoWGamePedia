const rp = require('request-promise'); // for doing async requests
const cheerio = require('cheerio');          // for jquery-like selecting

const url = 'https://www.google.com';

rp(url, (error,response,html)=>{
    if(!error && response.statusCode == 200){
        const $ = cheerio.load(html);
        console.log($)
    }else{
        console.error(error);
    }
})