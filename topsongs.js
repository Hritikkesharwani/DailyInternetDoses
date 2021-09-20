let pptr = require("puppeteer");
let fs=require("fs");
let browserstartpromise = pptr.launch({
    headless : true,
    defaultViewport : null,
    args : [ "--start-maximized" , "--disable-notifications" ]
});
// scraping data from website
(async function () {
    try{
        let browserobj = await browserstartpromise;
        let page = await browserobj.newPage();
        await page.goto("https://spotifycharts.com/regional");

        let someList = await page.$$(".chart-table-track");
           let value= [];
           let html = '<html> <head><title>Top 10 songs</title></head><body><button><a href="mainWindow.html">Go Back</a></button> <div><h1>Here is the list of top 10 songs</h1><ul>';
           for (let i = 1; i < 11; i++){
               value[i-1] = await page.evaluate(
            function (element) { return element.textContent }, someList[i]);
                value[i-1] = value[i-1].split("\n")[1].trim();
                html += "<li>";
                html+= value[i-1];
                html += "</li>";
           }
              html += '</div><h4>Source- Spotify </h4></body></html></ul>';
              fs.writeFileSync("songs.html",html);
    } catch (err){
        console.log("Error: " + err);
    }
})();
