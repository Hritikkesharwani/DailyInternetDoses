let pptr = require("puppeteer");
let fs=require("fs");
let browserstartpromise = pptr.launch({
    headless : true,
    defaultViewport : null,
    args : [ "--start-maximized" , "--disable-notifications" ]

   // scraping data from website 
});
(async function () {
    try{
        let browserobj = await browserstartpromise;
        let page = await browserobj.newPage();
        await page.goto("https://www.mentalfloss.com/amazingfactgenerator");
        await page.click(".more-facts");
        await page.waitForSelector(".af-description");
        let desc = await page.$$(".af-description");
        let ft = "";
        ft+= await page.evaluate(
                function (element) { return element.textContent }, desc[0]);
                
let html = '<html> <head><title>DailyFact</title></head><body><button><a href="mainWindow.html">Go Back</a></button> <div><h1>Fact to blow your Mind</h1>';
     html += '<div><h5>'
      html+= ft;
      html += '</div></div></h5><h4>Source- mentalfloss/amazingfactgenerator </h4></body></html>';
      fs.writeFileSync("fact.html",html);
            
    } catch (err){
        console.log("Error: " + err);
    }
})();
