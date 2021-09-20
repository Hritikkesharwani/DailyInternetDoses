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
        await page.goto("https://www.hindustantimes.com");
        await page.waitForSelector(".hdg3");
        let someList = await page.$$(".hdg3");
           let value= [];
           let html = '<html> <head><title>Top News</title></head><body><button><a href="mainWindow.html">Go Back</a></button> <div><h1>Todays Headline </h1><ul>';
           for (let i = 1; i < 11; i++){
               value[i-1] = await page.evaluate(
            function (element) { return element.textContent }, someList[i]);
                html += "<li>";
                html+= value[i-1];
                html += "</li>";
           }         
              html += '</div><h4>Source- Hindustan Times </h4></body></html></ul>';
              fs.writeFileSync("news.html",html);

    } catch (err){
        console.log("Error: " + err);
    }
})();
