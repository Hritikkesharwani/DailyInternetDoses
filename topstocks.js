let pptr = require("puppeteer");
let fs=require("fs");
let browserstartpromise = pptr.launch({
    headless : true,
    defaultViewport : null,
    args : [ "--start-maximized" , "--disable-notifications" ]

    
});
(async function () {
    try{
        let browserobj = await browserstartpromise;
        let page = await browserobj.newPage();
        await page.goto("https://www.google.com/");
        await page.type("input[title='Search']","today's top stocks to buy",)
        await page.keyboard.press('Enter',{delay : 1000 });

        let someList = await page.$$(".TrT0Xe");
         
           let value= [];
           let html = '<html> <head><title>Top stocks</title></head><body><button><a href="mainWindow.html">Go Back</a></button> <div><h1>Latest in Todays Pick</h1><ul>';
           for (let i = 0; i < 8; i++){
               value[i] = await page.evaluate(
            function (element) { return element.textContent }, someList[i]);
                value[i] = value[i].split(":")[0].trim();
                html += "<li>";
                html+= value[i];
                html += "</li>";
                
           }
          
              html += "</div><h4>source google</h4></body></html></ul>";
              fs.writeFileSync("stocks.html",html);
    } catch (err){
        console.log("Error: " + err);
    }
})();