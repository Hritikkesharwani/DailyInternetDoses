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
        await page.goto("https://nationaltoday.com/what-is-today/");
        let someList = await page.$$(".holiday-title");
           let value= [];
           let html = '<html> <head><title>Today is Special</title></head><body><button><a href="mainWindow.html">Go Back</a></button> <div><h1> What is Today?</h1><ul>';
           for (let i = 0; i < 6; i++){
               value[i] = await page.evaluate(
            function (element) { return element.textContent }, someList[i]);
                html += "<li>";
                html+= value[i];
                html += "</li>";
           }
           
           html += '</div><h4>Source- nationaltoday/what is today </h4></body></html></ul>';
           fs.writeFileSync("specials.html",html);
    } catch (err){
        console.log("Error: " + err);
    }
})();
